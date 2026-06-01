import { Router } from 'express';
import authRouter from './auth';
import transactionRouter from './transactions';
import budgetRouter from './budgets';
import reportRouter from './reports';

const router = Router();

router.use('/auth', authRouter);
router.use('/transactions', transactionRouter);
router.use('/budgets', budgetRouter);
router.use('/reports', reportRouter);

export default router;
