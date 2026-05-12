import { Router } from 'express';
import { IncomeController } from '../controllers/IncomeController';

const router: Router = Router();

// Retrieve all income records (GET)
router.get('/', IncomeController.getAll);

// Retrieve a specific income entry by ID (GET)
router.get('/:id', IncomeController.getById);

// Create a new income entry (POST)
router.post('/', IncomeController.create);

// Update an existing income entry (PUT)
router.put('/:id', IncomeController.update);

// Remove an income record (DELETE)
router.delete('/:id', IncomeController.delete);

export default router;
