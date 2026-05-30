import { Router, Request, Response } from 'express';
import { Transaction, CreateTransactionDTO, UpdateTransactionDTO } from '../models/Transaction';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
let transactions: Transaction[] = [];

router.get('/transactions', (req: Request, res: Response) => {
  res.json({ success: true, data: transactions });
});

router.post('/transactions', (req: Request, res: Response) => {
  const body: CreateTransactionDTO = req.body;
  const now = new Date().toISOString();
  const newTransaction: Transaction = {
    id: uuidv4(),
    ...body,
    createdAt: now,
    updatedAt: now,
  };
  transactions.push(newTransaction);
  res.status(201).json({ success: true, data: newTransaction });
});

router.delete('/transactions/:id', (req: Request, res: Response) => {
  const index = transactions.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, error: 'Not found' });
  transactions.splice(index, 1);
  res.json({ success: true, message: 'Deleted' });
});

export default router;