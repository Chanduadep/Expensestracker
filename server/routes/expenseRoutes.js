import express from 'express';
import { addExpense, getExpenses, updateExpense, deleteExpense } from '../controllers/expenseController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyToken); 

router.post('/', addExpense);
router.get('/', getExpenses);

router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;
