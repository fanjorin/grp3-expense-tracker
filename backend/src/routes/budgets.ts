import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate } from '../middleware/auth';

const router = Router();

// Get all budgets for the authenticated user
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const budgets = await prisma.budget.findMany({
      where: { userId },
    });
    res.json({ success: true, data: budgets });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create or update a budget for a category
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { category, limit } = req.body;

    const budget = await prisma.budget.upsert({
      where: {
        userId_category: {
          userId,
          category,
        },
      },
      update: {
        limit: parseFloat(limit),
      },
      create: {
        userId,
        category,
        limit: parseFloat(limit),
      },
    });

    res.status(200).json({ success: true, data: budget });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete a budget
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const id = parseInt(req.params['id'] as string);

    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: 'Invalid ID' });
    }

    const budget = await prisma.budget.findUnique({ where: { id } });

    if (!budget || budget.userId !== userId) {
      return res.status(404).json({ success: false, error: 'Budget not found' });
    }

    await prisma.budget.delete({ where: { id } });

    res.json({ success: true, message: 'Budget deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
