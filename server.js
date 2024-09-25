const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

let users = []; // Vaqtinchalik ma'lumotlar saqlash

app.use(bodyParser.json());
app.use(express.static('public'));

// Ro'yxatdan o'tish
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Bu username allaqachon mavjud!' });
    }

    users.push({ username, email, password });
    res.status(200).json({ message: 'Ro\'yxatdan muvaffaqiyatli o\'tildi!' });
});

// Login qilish
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        return res.status(200).json({ success: true, message: 'Login muvaffaqiyatli o\'tdi' });
    } else {
        return res.status(401).json({ success: false, message: 'Username yoki parol noto\'g\'ri' });
    }
});

app.listen(port, () => {
    console.log(`Server http://localhost:${port} da ishlamoqda`);
});
