export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description?: string;
  date: string; // Storing as ISO-8601 string for easy JSON serialization
  createdAt: string;
  updatedAt: string;
}

export type CreateTransactionDTO = Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateTransactionDTO = Partial<CreateTransactionDTO>;
