// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');
// const salaryRoutes = require('./routes/salary');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// console.log('Express server tayyor...');

// // MongoDB ulanish
// mongoose.connect('mongodb://localhost/salaryTracker', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDBga ulanish muvaffaqiyatli'))
// .catch(err => console.error('MongoDBga ulanishda xatolik:', err));

// // Routerlarni ulash
// app.use('/api/auth', authRoutes);
// app.use('/api/salary', salaryRoutes);

// console.log('Routerlar ulandi...');

// // Serverni ishga tushirish
// const port = 3000;
// app.listen(port, () => {
//     console.log(`Server ${port}-portda ishlamoqda...`);
// });





// const express = require('express');
// const path = require('path');
// const app = express();
// const port = process.env.PORT || 3001;

// // Statik fayllarni ulash (HTML va CSS fayllarini ishlatish)
// app.use(express.static(path.join(__dirname, 'public')));

// // POST so'rovini olish (foydalanuvchidan ma'lumot olish)
// app.use(express.urlencoded({ extended: true }));

// app.post('/submit-salary', (req, res) => {
//     const amount = req.body.amount;
//     console.log(`Kiritilgan miqdor: ${amount}`);
//     res.send(`<h2>Kiritilgan miqdor: ${amount}</h2><a href="/">Orqaga</a>`);
// });

// // Serverni ishga tushirish
// app.listen(port, () => {
//   console.log(`Server ${port}-portda ishlamoqda...`);
// });



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB ulanish
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Auth routes
app.use('/api/auth', require('./routes/auth'));

// Serverni ishga tushirish
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

