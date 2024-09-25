const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

let users = []; // Vaqtincha ma'lumotlar saqlash

app.use(bodyParser.json());
app.use(express.static('public'));

// Ro'yxatdan o'tish
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    if (users.find(user => user.username === username)) {
        return res.json({ message: 'Bu username mavjud!' });
    }
    users.push({ username, email, password });
    res.json({ message: 'Ro\'yxatdan muvaffaqiyatli o\'tildi!' });
});

// Login qilish
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Username yoki parol noto\'g\'ri' });
    }
});

app.listen(port, () => {
    console.log(`Server http://localhost:${port} da ishlamoqda`);
});
