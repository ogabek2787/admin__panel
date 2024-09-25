const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Foydalanuvchilarni vaqtinchalik saqlash (bu ma'lumotlar bazasi bilan almashtirilishi mumkin)
//let users = [];

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/salary-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB ga muvaffaqiyatli ulandi');
}).catch((err) => {
    console.error('MongoDB ga ulanishda xatolik:', err);
});


// Static fayllarni servis qilish
app.use(express.static('public'));
app.use(bodyParser.json());

// Ro'yxatdan o'tish endpoint
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Foydalanuvchini tekshirish
  const existingUser = await User.findOne({ username });
  if (existingUser) {
      return res.status(400).json({ message: 'Bu username allaqachon mavjud. Boshqa username tanlang.' });
  }

  // Yangi foydalanuvchini yaratish
  const newUser = new User({ username, email, password });
  await newUser.save();
  res.status(200).json({ message: "Ro'yxatdan o'tish muvaffaqiyatli!" });
});


// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Foydalanuvchini topish
  const user = await User.findOne({ username, password });
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

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dailyIncome: { type: Number, default: 0 }
});

const User = mongoose.model('User', UserSchema);


// Serverni ishga tushirish
app.listen(port, () => {
    console.log(`Server http://localhost:${port} da ishlamoqda`);
});
