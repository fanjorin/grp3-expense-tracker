import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { ITransactionRepository } from './ITransactionRepository';
import { Transaction, CreateTransactionDTO, UpdateTransactionDTO } from '../models/Transaction';

export class JsonTransactionRepository implements ITransactionRepository {
  private filePath: string;

  constructor(filename: string = 'transactions.json') {
    this.filePath = path.join(__dirname, '../../data', filename);
  }

  private async ensureFileExists(): Promise<void> {
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.mkdir(path.dirname(this.filePath), { recursive: true });
      await fs.writeFile(this.filePath, JSON.stringify([]), 'utf-8');
    }
  }

  private async readData(): Promise<Transaction[]> {
    await this.ensureFileExists();
    const data = await fs.readFile(this.filePath, 'utf-8');
    try {
      return JSON.parse(data) as Transaction[];
    } catch {
      return [];
    }
  }

  private async writeData(data: Transaction[]): Promise<void> {
    await this.ensureFileExists();
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async findAll(): Promise<Transaction[]> {
    return await this.readData();
  }

  async findById(id: string): Promise<Transaction | null> {
    const transactions = await this.readData();
    return transactions.find((t) => t.id === id) || null;
  }

  async create(data: CreateTransactionDTO): Promise<Transaction> {
    const transactions = await this.readData();
    const now = new Date().toISOString();

    const newTransaction: Transaction = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    transactions.push(newTransaction);
    await this.writeData(transactions);

    return newTransaction;
  }

  async update(id: string, data: UpdateTransactionDTO): Promise<Transaction | null> {
    const transactions = await this.readData();
    const index = transactions.findIndex((t) => t.id === id);

    if (index === -1) {
      return null;
    }

    const updatedTransaction: Transaction = {
      ...transactions[index],
      ...data,
      updatedAt: new Date().toISOString(),
    } as Transaction;

    transactions[index] = updatedTransaction;
    await this.writeData(transactions);

    return updatedTransaction;
  }

  async delete(id: string): Promise<boolean> {
    const transactions = await this.readData();
    const initialLength = transactions.length;

    const filteredTransactions = transactions.filter((t) => t.id !== id);

    if (filteredTransactions.length === initialLength) {
      return false;
    }

    await this.writeData(filteredTransactions);
    return true;
  }
}
