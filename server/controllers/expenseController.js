import Expense from '../models/Expense.js';
import mongoose from 'mongoose';

export const addExpense = async (req, res) => {
  const { description, amount, date } = req.body;

  try {
    const newExpense = new Expense({description,amount,date,userId: req.userId, });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId });
    if (!expenses.length) {
      return res.status(404).json({ error: 'No expenses are found for this user' });
    }
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getExpenseById = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findOne({ _id: id, userId: req.userId });
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { description, amount, date } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Expense ID" });
  }
  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { description, amount, date },
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found or unauthorized" });
    }
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    await Expense.findOneAndDelete({ _id: id, userId: req.userId });
    res.status(200).json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
