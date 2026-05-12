import { Request, Response } from 'express';
import { transactionRepository } from '../repositories';

export class SummaryController {
  static async getSummary(req: Request, res: Response): Promise<void> {
    try {
      const transactions = await transactionRepository.findAll();

      const { startDate, endDate } = req.query;
      let filteredTransactions = transactions;

      if (startDate) {
        filteredTransactions = filteredTransactions.filter(
          (t) => new Date(t.date) >= new Date(startDate as string)
        );
      }

      if (endDate) {
        filteredTransactions = filteredTransactions.filter(
          (t) => new Date(t.date) <= new Date(endDate as string)
        );
      }

      let totalIncome = 0;
      let totalExpense = 0;

      filteredTransactions.forEach((t) => {
        if (t.type === 'INCOME') {
          totalIncome += t.amount;
        } else if (t.type === 'EXPENSE') {
          totalExpense += t.amount;
        }
      });

      const currentBalance = totalIncome - totalExpense;

      res.status(200).json({
        totalIncome,
        totalExpense,
        currentBalance,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve summary' });
    }
  }

  static async getExpensesByCategory(req: Request, res: Response): Promise<void> {
    try {
      const transactions = await transactionRepository.findAll();
      const expenses = transactions.filter((t) => t.type === 'EXPENSE');

      const { startDate, endDate } = req.query;
      let filteredExpenses = expenses;

      if (startDate) {
        filteredExpenses = filteredExpenses.filter(
          (e) => new Date(e.date) >= new Date(startDate as string)
        );
      }

      if (endDate) {
        filteredExpenses = filteredExpenses.filter(
          (e) => new Date(e.date) <= new Date(endDate as string)
        );
      }

      const categoryTotals: Record<string, number> = {};

      filteredExpenses.forEach((e) => {
        const currentTotal = categoryTotals[e.category] || 0;
        categoryTotals[e.category] = currentTotal + e.amount;
      });

      const result = Object.entries(categoryTotals).map(([category, total]) => ({
        category,
        total,
      }));

      // Sort descending by total
      result.sort((a, b) => b.total - a.total);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve expenses by category' });
    }
  }
}
