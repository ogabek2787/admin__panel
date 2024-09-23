const express = require('express');
const jwt = require('jsonwebtoken');
const Salary = require('../models/Salary');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = 'your_secret_key';

// Kundalik pul miqdorini saqlash
router.post('/add', async (req, res) => {
    const { token, amount } = req.body;
    const decoded = jwt.verify(token, JWT_SECRET);
    const salary = new Salary({ userId: decoded.id, amount });
    await salary.save();
    res.json({ message: 'Pul miqdori saqlandi!' });
});

// Oylik umumiy hisobni olish
router.get('/get', async (req, res) => {
    const { token } = req.query;
    const decoded = jwt.verify(token, JWT_SECRET);
    const salaries = await Salary.find({ userId: decoded.id });
    res.json(salaries);
});

// Oylik umumiy hisobni olish va qaydlarni ko'rsatish
router.get('/getMonthlyTotal', async (req, res) => {
    const { token } = req.query;
    const decoded = jwt.verify(token, JWT_SECRET);
    const salaries = await Salary.aggregate([
        { $match: { userId: decoded.id } },
        {
            $group: {
                _id: { $month: "$date" },
                total: { $sum: "$amount" }
            }
        }
    ]);
    res.json(salaries);
});

module.exports = router;
