import { Router } from 'express';
import { SummaryController } from '../controllers/SummaryController';

const router: Router = Router();

// Retrieve a high-level overview (total income, total expense, current balance)
router.get('/', SummaryController.getSummary);

// Retrieve aggregated expenses grouped by category
router.get('/expenses-by-category', SummaryController.getExpensesByCategory);

export default router;
