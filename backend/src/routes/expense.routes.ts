import { Router } from 'express';
import { ExpenseController } from '../controllers/ExpenseController';

const router: Router = Router();

// Retrieve all expense records (GET)
router.get('/', ExpenseController.getAll);

// Retrieve a specific expense entry by ID (GET)
router.get('/:id', ExpenseController.getById);

// Create a new expense entry (POST)
router.post('/', ExpenseController.create);

// Update an existing expense entry (PUT)
router.put('/:id', ExpenseController.update);

// Remove an expense record (DELETE)
router.delete('/:id', ExpenseController.delete);

export default router;
