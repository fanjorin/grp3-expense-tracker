import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate } from '../middleware/auth';
import { startOfMonth, endOfMonth, subMonths, startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';

const router = Router();

// Get budget summary (total budget, spent, remaining)
router.get('/summary', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    // Get total budget
    const budgets = await prisma.budget.findMany({
      where: { userId },
    });
    const totalBudget = budgets.reduce((acc, b) => acc + b.limit, 0);

    // Get total spent this month
    const expenses = await prisma.expense.aggregate({
      where: {
        userId,
        type: 'EXPENSE',
        date: {
          gte: start,
          lte: end,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const spent = expenses._sum.amount || 0;
    const remaining = totalBudget - spent;
    const percentage = totalBudget > 0 ? Math.min((spent / totalBudget) * 100, 100) : 0;

    res.json({
      success: true,
      data: {
        totalBudget,
        spent,
        remaining,
        percentage,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get spending by category
router.get('/categories', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    const categories = await prisma.expense.groupBy({
      by: ['category'],
      where: {
        userId,
        type: 'EXPENSE',
        date: {
          gte: start,
          lte: end,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const totalSpent = categories.reduce((acc, c) => acc + (c._sum.amount || 0), 0);

    const data = categories.map((c) => ({
      name: c.category,
      amount: c._sum.amount || 0,
      percentage: totalSpent > 0 ? ((c._sum.amount || 0) / totalSpent) * 100 : 0,
    }));

    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get comparative stats vs last month
router.get('/stats', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const now = new Date();
    
    const currentStart = startOfMonth(now);
    const currentEnd = endOfMonth(now);
    
    const lastStart = startOfMonth(subMonths(now, 1));
    const lastEnd = endOfMonth(subMonths(now, 1));

    // Helper to get totals
    const getTotals = async (start: Date, end: Date) => {
      const totals = await prisma.expense.groupBy({
        by: ['type'],
        where: {
          userId,
          date: {
            gte: start,
            lte: end,
          },
        },
        _sum: {
          amount: true,
        },
      });

      return {
        expense: totals.find(t => t.type === 'EXPENSE')?._sum.amount || 0,
        income: totals.find(t => t.type === 'INCOME')?._sum.amount || 0,
      };
    };

    const currentTotals = await getTotals(currentStart, currentEnd);
    const lastTotals = await getTotals(lastStart, lastEnd);

    const calculateChange = (current: number, last: number) => {
      if (last === 0) return current > 0 ? 100 : 0;
      return ((current - last) / last) * 100;
    };

    res.json({
      success: true,
      data: {
        current: currentTotals,
        last: lastTotals,
        changes: {
          expense: calculateChange(currentTotals.expense, lastTotals.expense),
          income: calculateChange(currentTotals.income, lastTotals.income),
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get spending over the last 7 days
router.get('/over-time', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const end = new Date();
    const start = startOfWeek(end, { weekStartsOn: 1 }); // Start of current week (Monday)
    const weekEnd = endOfWeek(end, { weekStartsOn: 1 });

    const days = eachDayOfInterval({ start, end: weekEnd });

    const expenses = await prisma.expense.findMany({
      where: {
        userId,
        type: 'EXPENSE',
        date: {
          gte: start,
          lte: weekEnd,
        },
      },
    });

    const data = days.map(day => {
      const dayName = format(day, 'EEE');
      const amount = expenses
        .filter(e => format(e.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
        .reduce((acc, e) => acc + e.amount, 0);
      
      return { day: dayName, amount };
    });

    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
