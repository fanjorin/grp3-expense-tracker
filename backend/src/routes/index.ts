import { Router } from 'express';
import expenseRoutes from './expense.routes';
import incomeRoutes from './income.routes';
import summaryRoutes from './summary.routes';

const router: Router = Router();

router.use('/expenses', expenseRoutes);
router.use('/income', incomeRoutes);
router.use('/summary', summaryRoutes);

export default router;
