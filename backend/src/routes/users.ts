import { Router, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../utils/prisma.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

// Update profile
router.put('/profile', async (req: AuthRequest, res: Response) => {
  try {
    const { displayName, avatar } = req.body;

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: { displayName, avatar },
      select: {
        id: true,
        email: true,
        displayName: true,
        avatar: true,
        walletAddress: true,
        subscriptionTier: true,
      },
    });

    res.json({ user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Change password
router.put('/password', async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password required' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: req.userId },
      data: { passwordHash },
    });

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// Get usage stats
router.get('/usage', async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        subscriptionTier: true,
        deploymentsThisMonth: true,
        deploymentsResetAt: true,
        _count: {
          select: {
            projects: true,
            deployments: true,
            templates: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const limits: Record<string, number> = {
      FREE: 3,
      STARTER: 25,
      PROFESSIONAL: 999999,
      ENTERPRISE: 999999,
    };

    res.json({
      subscription: user.subscriptionTier,
      deploymentsUsed: user.deploymentsThisMonth,
      deploymentsLimit: limits[user.subscriptionTier],
      resetsAt: user.deploymentsResetAt,
      projectCount: user._count.projects,
      deploymentCount: user._count.deployments,
      templateCount: user._count.templates,
    });
  } catch (error) {
    console.error('Get usage error:', error);
    res.status(500).json({ error: 'Failed to get usage stats' });
  }
});

// API Keys management
router.get('/api-keys', async (req: AuthRequest, res: Response) => {
  try {
    const apiKeys = await prisma.apiKey.findMany({
      where: { userId: req.userId },
      select: {
        id: true,
        name: true,
        prefix: true,
        permissions: true,
        lastUsedAt: true,
        usageCount: true,
        isActive: true,
        expiresAt: true,
        createdAt: true,
      },
    });

    res.json({ apiKeys });
  } catch (error) {
    console.error('List API keys error:', error);
    res.status(500).json({ error: 'Failed to list API keys' });
  }
});

router.post('/api-keys', async (req: AuthRequest, res: Response) => {
  try {
    const { name, permissions = ['read'], expiresAt } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Generate API key
    const rawKey = `cf_${uuidv4().replace(/-/g, '')}`;
    const keyHash = await bcrypt.hash(rawKey, 10);
    const prefix = rawKey.substring(0, 10);

    const apiKey = await prisma.apiKey.create({
      data: {
        userId: req.userId!,
        name,
        keyHash,
        prefix,
        permissions,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
      select: {
        id: true,
        name: true,
        prefix: true,
        permissions: true,
        createdAt: true,
      },
    });

    // Return the raw key only once
    res.status(201).json({
      apiKey,
      key: rawKey, // Only shown once!
      message: 'Save this key securely - it will not be shown again',
    });
  } catch (error) {
    console.error('Create API key error:', error);
    res.status(500).json({ error: 'Failed to create API key' });
  }
});

router.delete('/api-keys/:id', async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.apiKey.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!existing) {
      return res.status(404).json({ error: 'API key not found' });
    }

    await prisma.apiKey.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'API key deleted' });
  } catch (error) {
    console.error('Delete API key error:', error);
    res.status(500).json({ error: 'Failed to delete API key' });
  }
});

// Delete account
router.delete('/account', async (req: AuthRequest, res: Response) => {
  try {
    const { password } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Delete user (cascades to related records)
    await prisma.user.delete({
      where: { id: req.userId },
    });

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

export default router;
