const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Foydalanuvchilarni vaqtinchalik saqlash
let users = [];

// Static fayllarni servis qilish
app.use(express.static('public'));

// Ma'lumotlarni JSON formatida qabul qilish uchun
app.use(bodyParser.json());

// Ro'yxatdan o'tish endpoint
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Foydalanuvchi borligini tekshirish
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Username mavjud, boshqa username tanlang.' });
    }

    // Foydalanuvchini ro'yxatga qo'shish
    users.push({ username, email, password, dailyIncome: 0 });
    res.status(200).json({ message: 'Ro\'yxatdan o\'tish muvaffaqiyatli!' });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Foydalanuvchini topish
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.status(200).json({ success: true, message: 'Login muvaffaqiyatli!', user });
    } else {
        res.status(401).json({ success: false, message: 'Login yoki parol noto\'g\'ri.' });
    }
});

// Daromad qo'shish endpoint
app.post('/add-income', (req, res) => {
    const { username, income } = req.body;

    // Foydalanuvchini topish va daromad qo'shish
    const user = users.find(user => user.username === username);
    if (user) {
        user.dailyIncome += income;
        res.status(200).json({ success: true, message: 'Daromad qo\'shildi.', dailyIncome: user.dailyIncome });
    } else {
        res.status(404).json({ success: false, message: 'Foydalanuvchi topilmadi.' });
    }
});

// Serverni ishga tushirish
app.listen(port, () => {
    console.log(`Server http://localhost:${port} da ishlamoqda`);
});
