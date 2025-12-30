import { Router, Response } from 'express';
import { z } from 'zod';
import prisma from '../utils/prisma.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Public routes (no auth required)

// List public templates
router.get('/public', async (req, res) => {
  try {
    const { category, search, sort } = req.query;

    const where: Record<string, unknown> = { isPublic: true };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { tags: { has: search as string } },
      ];
    }

    const orderBy: Record<string, string> = {};
    switch (sort) {
      case 'rating':
        orderBy.rating = 'desc';
        break;
      case 'newest':
        orderBy.createdAt = 'desc';
        break;
      case 'downloads':
      default:
        orderBy.downloads = 'desc';
    }

    const templates = await prisma.template.findMany({
      where,
      orderBy,
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        icon: true,
        tags: true,
        price: true,
        currency: true,
        downloads: true,
        rating: true,
        reviewCount: true,
        audited: true,
        author: {
          select: {
            id: true,
            displayName: true,
          },
        },
        createdAt: true,
      },
    });

    res.json({ templates });
  } catch (error) {
    console.error('List templates error:', error);
    res.status(500).json({ error: 'Failed to list templates' });
  }
});

// Get single public template
router.get('/public/:id', async (req, res) => {
  try {
    const template = await prisma.template.findFirst({
      where: { id: req.params.id, isPublic: true },
      include: {
        author: {
          select: {
            id: true,
            displayName: true,
          },
        },
      },
    });

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // Increment download count for views
    await prisma.template.update({
      where: { id: template.id },
      data: { downloads: { increment: 1 } },
    });

    res.json({ template });
  } catch (error) {
    console.error('Get template error:', error);
    res.status(500).json({ error: 'Failed to get template' });
  }
});

// Protected routes
router.use(authenticate);

const createTemplateSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1),
  category: z.string(),
  icon: z.string().optional(),
  blocks: z.array(z.any()),
  edges: z.array(z.any()),
  tags: z.array(z.string()).default([]),
  isPublic: z.boolean().default(false),
  price: z.number().default(0),
});

// List user's templates
router.get('/mine', async (req: AuthRequest, res: Response) => {
  try {
    const templates = await prisma.template.findMany({
      where: { authorId: req.userId },
      orderBy: { updatedAt: 'desc' },
    });

    res.json({ templates });
  } catch (error) {
    console.error('List user templates error:', error);
    res.status(500).json({ error: 'Failed to list templates' });
  }
});

// Create template
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const data = createTemplateSchema.parse(req.body);

    const template = await prisma.template.create({
      data: {
        authorId: req.userId!,
        ...data,
      },
    });

    res.status(201).json({ template });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Create template error:', error);
    res.status(500).json({ error: 'Failed to create template' });
  }
});

// Update template
router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.template.findFirst({
      where: { id: req.params.id, authorId: req.userId },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Template not found' });
    }

    const data = createTemplateSchema.partial().parse(req.body);

    const template = await prisma.template.update({
      where: { id: req.params.id },
      data,
    });

    res.json({ template });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Update template error:', error);
    res.status(500).json({ error: 'Failed to update template' });
  }
});

// Delete template
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.template.findFirst({
      where: { id: req.params.id, authorId: req.userId },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Template not found' });
    }

    await prisma.template.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Template deleted' });
  } catch (error) {
    console.error('Delete template error:', error);
    res.status(500).json({ error: 'Failed to delete template' });
  }
});

// Create project from template
router.post('/:id/use', async (req: AuthRequest, res: Response) => {
  try {
    const template = await prisma.template.findFirst({
      where: {
        id: req.params.id,
        OR: [{ isPublic: true }, { authorId: req.userId }],
      },
    });

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // TODO: Check if paid template and user has purchased

    const project = await prisma.project.create({
      data: {
        userId: req.userId!,
        name: req.body.name || template.name,
        description: template.description,
        blocks: template.blocks as object,
        edges: template.edges as object,
      },
    });

    // Increment download count
    await prisma.template.update({
      where: { id: template.id },
      data: { downloads: { increment: 1 } },
    });

    res.status(201).json({ project });
  } catch (error) {
    console.error('Use template error:', error);
    res.status(500).json({ error: 'Failed to create project from template' });
  }
});

export default router;
