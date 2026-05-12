import {
  Transaction,
  CreateTransactionDTO,
  UpdateTransactionDTO,
} from "../models/Transaction";

export interface ITransactionRepository {
  findAll(): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction | null>;
  create(data: CreateTransactionDTO): Promise<Transaction>;
  update(id: string, data: UpdateTransactionDTO): Promise<Transaction | null>;
  delete(id: string): Promise<boolean>;
}
