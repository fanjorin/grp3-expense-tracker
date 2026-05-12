import { Request, Response } from 'express';
import { transactionRepository } from '../repositories';
import { CreateTransactionDTO, UpdateTransactionDTO } from '../models/Transaction';

export class ExpenseController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const transactions = await transactionRepository.findAll();
      const expenses = transactions.filter(t => t.type === 'EXPENSE');

      const { category, startDate, endDate } = req.query;
      let filteredExpenses = expenses;

      if (category) {
        filteredExpenses = filteredExpenses.filter(e => e.category === category);
      }

      if (startDate) {
        filteredExpenses = filteredExpenses.filter(e => new Date(e.date) >= new Date(startDate as string));
      }

      if (endDate) {
        filteredExpenses = filteredExpenses.filter(e => new Date(e.date) <= new Date(endDate as string));
      }

      res.status(200).json(filteredExpenses);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve expenses' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const expense = await transactionRepository.findById(id);

      if (!expense || expense.type !== 'EXPENSE') {
        res.status(404).json({ error: 'Expense not found' });
        return;
      }

      res.status(200).json(expense);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve expense' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { amount, category, description, date } = req.body;

      if (amount === undefined || !category || !date) {
        res.status(400).json({ error: 'Amount, category, and date are required' });
        return;
      }

      const newExpenseData: CreateTransactionDTO = {
        type: 'EXPENSE',
        amount: Number(amount),
        category,
        description,
        date,
      };

      const newExpense = await transactionRepository.create(newExpenseData);
      res.status(201).json(newExpense);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create expense' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const expense = await transactionRepository.findById(id);

      if (!expense || expense.type !== 'EXPENSE') {
        res.status(404).json({ error: 'Expense not found' });
        return;
      }

      const updateData: UpdateTransactionDTO = req.body;
      // Ensure we don't accidentally change the type
      delete updateData.type;

      const updatedExpense = await transactionRepository.update(id, updateData);
      res.status(200).json(updatedExpense);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update expense' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const expense = await transactionRepository.findById(id);

      if (!expense || expense.type !== 'EXPENSE') {
        res.status(404).json({ error: 'Expense not found' });
        return;
      }

      const deleted = await transactionRepository.delete(id);
      if (!deleted) {
         res.status(500).json({ error: 'Failed to delete expense' });
         return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete expense' });
    }
  }
}
