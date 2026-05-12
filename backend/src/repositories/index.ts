import { JsonTransactionRepository } from './JsonTransactionRepository';

export * from './ITransactionRepository';
export * from './JsonTransactionRepository';

export const transactionRepository = new JsonTransactionRepository();
