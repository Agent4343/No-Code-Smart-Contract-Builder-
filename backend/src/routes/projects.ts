import { Router, Response } from 'express';
import { z } from 'zod';
import prisma from '../utils/prisma.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Validation schemas
const createProjectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  blocks: z.array(z.any()).default([]),
  edges: z.array(z.any()).default([]),
});

const updateProjectSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  blocks: z.array(z.any()).optional(),
  edges: z.array(z.any()).optional(),
  sourceCode: z.string().optional(),
  abi: z.array(z.any()).optional(),
  bytecode: z.string().optional(),
  securityScore: z.number().optional(),
  securityReport: z.any().optional(),
  estimatedGas: z.number().optional(),
});

// List projects
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.userId },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        name: true,
        description: true,
        securityScore: true,
        estimatedGas: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { deployments: true },
        },
      },
    });

    res.json({ projects });
  } catch (error) {
    console.error('List projects error:', error);
    res.status(500).json({ error: 'Failed to list projects' });
  }
});

// Get single project
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const project = await prisma.project.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
      include: {
        deployments: {
          orderBy: { deployedAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ project });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Failed to get project' });
  }
});

// Create project
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const data = createProjectSchema.parse(req.body);

    const project = await prisma.project.create({
      data: {
        userId: req.userId!,
        name: data.name,
        description: data.description,
        blocks: data.blocks,
        edges: data.edges,
      },
    });

    res.status(201).json({ project });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project
router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const data = updateProjectSchema.parse(req.body);

    // Check ownership
    const existing = await prisma.project.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    res.json({ project });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    // Check ownership
    const existing = await prisma.project.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await prisma.project.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Project deleted' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Duplicate project
router.post('/:id/duplicate', async (req: AuthRequest, res: Response) => {
  try {
    const original = await prisma.project.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!original) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const project = await prisma.project.create({
      data: {
        userId: req.userId!,
        name: `${original.name} (Copy)`,
        description: original.description,
        blocks: original.blocks as object,
        edges: original.edges as object,
      },
    });

    res.status(201).json({ project });
  } catch (error) {
    console.error('Duplicate project error:', error);
    res.status(500).json({ error: 'Failed to duplicate project' });
  }
});

export default router;
