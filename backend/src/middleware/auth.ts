import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma.js';

export interface AuthRequest extends Request {
  userId?: string;
  user?: {
    id: string;
    email: string;
    subscriptionTier: string;
  };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        subscriptionTier: true,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.userId = user.id;
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Check subscription limits
export const checkDeploymentLimit = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Reset monthly count if needed
    const now = new Date();
    if (now > user.deploymentsResetAt) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          deploymentsThisMonth: 0,
          deploymentsResetAt: new Date(now.getFullYear(), now.getMonth() + 1, 1),
        },
      });
      user.deploymentsThisMonth = 0;
    }

    // Check limits based on tier
    const limits: Record<string, number> = {
      FREE: 3,
      STARTER: 25,
      PROFESSIONAL: 999999,
      ENTERPRISE: 999999,
    };

    const limit = limits[user.subscriptionTier] || 3;

    if (user.deploymentsThisMonth >= limit) {
      return res.status(403).json({
        error: 'Deployment limit reached',
        limit,
        used: user.deploymentsThisMonth,
        tier: user.subscriptionTier,
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
