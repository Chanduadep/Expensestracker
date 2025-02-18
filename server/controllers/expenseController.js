import Expense from '../models/Expense.js';

export const addExpense = async (req, res) => {
  const { description, amount, date } = req.body;

  try {
    const newExpense = new Expense({
      description,
      amount,
      date,
      userId: req.userId, // user ID from the token
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { description, amount, date } = req.body;

  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { description, amount, date },
      { new: true }
    );
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
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
