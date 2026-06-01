import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate } from '../middleware/auth';

const router = Router();

// Get all transactions for the authenticated user
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const transactions = await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
    res.json({ success: true, data: transactions });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create a new transaction
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { amount, category, description, type, date } = req.body;

    const transaction = await prisma.expense.create({
      data: {
        userId,
        amount: parseFloat(amount),
        category,
        description: description || null,
        type: type || 'EXPENSE',
        date: date ? new Date(date) : new Date(),
      },
    });

    res.status(201).json({ success: true, data: transaction });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update a transaction
router.put('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const id = parseInt(req.params['id'] as string);
    const { amount, category, description, type, date } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: 'Invalid ID' });
    }

    const transaction = await prisma.expense.findUnique({ where: { id } });

    if (!transaction || transaction.userId !== userId) {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }

    const updateData: any = {};
    if (amount !== undefined) updateData.amount = parseFloat(amount);
    if (category !== undefined) updateData.category = category;
    if (description !== undefined) updateData.description = description || null;
    if (type !== undefined) updateData.type = type;
    if (date !== undefined) updateData.date = new Date(date);

    const updated = await prisma.expense.update({
      where: { id },
      data: updateData,
    });

    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete a transaction
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const id = parseInt(req.params['id'] as string);

    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: 'Invalid ID' });
    }

    const transaction = await prisma.expense.findUnique({ where: { id } });

    if (!transaction || transaction.userId !== userId) {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }

    await prisma.expense.delete({ where: { id } });

    res.json({ success: true, message: 'Transaction deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
