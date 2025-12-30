import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import prisma from '../utils/prisma.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  displayName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, displayName } = registerSchema.parse(req.body);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        displayName,
      },
      select: {
        id: true,
        email: true,
        displayName: true,
        subscriptionTier: true,
        createdAt: true,
      },
    });

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      message: 'Registration successful',
      user,
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        subscriptionTier: user.subscriptionTier,
        walletAddress: user.walletAddress,
      },
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Connect wallet
router.post('/connect-wallet', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { walletAddress, signature, message } = req.body;

    // In production, verify the signature here
    // const recoveredAddress = ethers.verifyMessage(message, signature);
    // if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
    //   return res.status(401).json({ error: 'Invalid signature' });
    // }

    // Check if wallet is already connected to another account
    const existingUser = await prisma.user.findUnique({
      where: { walletAddress },
    });

    if (existingUser && existingUser.id !== req.userId) {
      return res.status(400).json({ error: 'Wallet already connected to another account' });
    }

    // Update user
    const user = await prisma.user.update({
      where: { id: req.userId },
      data: { walletAddress },
      select: {
        id: true,
        email: true,
        walletAddress: true,
        subscriptionTier: true,
      },
    });

    res.json({ message: 'Wallet connected', user });
  } catch (error) {
    console.error('Connect wallet error:', error);
    res.status(500).json({ error: 'Failed to connect wallet' });
  }
});

// Get current user
router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        displayName: true,
        walletAddress: true,
        subscriptionTier: true,
        deploymentsThisMonth: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// Refresh token
router.post('/refresh', authenticate, async (req: AuthRequest, res: Response) => {
  const token = jwt.sign(
    { userId: req.userId },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  res.json({ token });
});

export default router;
