const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = 'your_secret_key'; // Buni xavfsiz kalit bilan almashtiring

// Ro'yxatdan o'tish
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ message: 'Foydalanuvchi ro\'yxatdan o\'tkazildi!' });
});

// Kirish
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ error: 'Foydalanuvchi topilmadi' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Parol noto\'g\'ri' });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token });
});

module.exports = router;
