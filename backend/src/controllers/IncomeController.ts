import { Request, Response } from 'express';
import { transactionRepository } from '../repositories';
import { CreateTransactionDTO, UpdateTransactionDTO } from '../models/Transaction';

export class IncomeController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const transactions = await transactionRepository.findAll();
      const incomes = transactions.filter(t => t.type === 'INCOME');

      const { category, startDate, endDate } = req.query;
      let filteredIncomes = incomes;

      if (category) {
        filteredIncomes = filteredIncomes.filter(i => i.category === category);
      }

      if (startDate) {
        filteredIncomes = filteredIncomes.filter(i => new Date(i.date) >= new Date(startDate as string));
      }

      if (endDate) {
        filteredIncomes = filteredIncomes.filter(i => new Date(i.date) <= new Date(endDate as string));
      }

      res.status(200).json(filteredIncomes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve income records' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const income = await transactionRepository.findById(id);

      if (!income || income.type !== 'INCOME') {
        res.status(404).json({ error: 'Income record not found' });
        return;
      }

      res.status(200).json(income);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve income record' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { amount, category, description, date } = req.body;

      if (amount === undefined || !category || !date) {
        res.status(400).json({ error: 'Amount, category, and date are required' });
        return;
      }

      const newIncomeData: CreateTransactionDTO = {
        type: 'INCOME',
        amount: Number(amount),
        category,
        description,
        date,
      };

      const newIncome = await transactionRepository.create(newIncomeData);
      res.status(201).json(newIncome);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create income record' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const income = await transactionRepository.findById(id);

      if (!income || income.type !== 'INCOME') {
        res.status(404).json({ error: 'Income record not found' });
        return;
      }

      const updateData: UpdateTransactionDTO = req.body;
      // Ensure we don't accidentally change the type
      delete updateData.type;

      const updatedIncome = await transactionRepository.update(id, updateData);
      res.status(200).json(updatedIncome);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update income record' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const income = await transactionRepository.findById(id);

      if (!income || income.type !== 'INCOME') {
        res.status(404).json({ error: 'Income record not found' });
        return;
      }

      const deleted = await transactionRepository.delete(id);
      if (!deleted) {
         res.status(500).json({ error: 'Failed to delete income record' });
         return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete income record' });
    }
  }
}
