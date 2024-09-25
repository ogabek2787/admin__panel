// import React, { useState } from 'react';

// function App() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const res = await fetch('/api/auth/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, email, password })
//     });
//     const data = await res.json();
//     setMessage(data.msg || 'Registered successfully');
//   };

//   return (
//     <div className="App">
//       <h1>Register</h1>
//       <form onSubmit={handleRegister}>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
//         <button type="submit">Register</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default App;


// Foydalanuvchi nomi taklif qilish
const usernameInput = document.getElementById('username');
const suggestionsList = document.getElementById('username-suggestions');

const availableUsernames = ['Ogabek', 'JohnDoe', 'JaneSmith', 'SuperUser', 'CoolGuy'];

usernameInput.addEventListener('input', function () {
  const query = usernameInput.value.toLowerCase();
  suggestionsList.innerHTML = '';
  if (query.length > 2) {
    const filteredSuggestions = availableUsernames.filter(username => 
      username.toLowerCase().includes(query)
    );
    filteredSuggestions.forEach(suggestion => {
      const li = document.createElement('li');
      li.textContent = suggestion;
      li.addEventListener('click', function () {
        usernameInput.value = suggestion;
        suggestionsList.innerHTML = '';
      });
      suggestionsList.appendChild(li);
    });
  }
});

// Parol tekshirish
const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('password-error');

passwordInput.addEventListener('input', function () {
  const password = passwordInput.value;
  let errorMessage = '';

  if (password.length < 8) {
    errorMessage += 'Parol kamida 8 ta belgidan iborat bo\'lishi kerak. ';
  }
  if (!/[A-Z]/.test(password)) {
    errorMessage += 'Kamida bitta katta harf bo\'lishi kerak. ';
  }
  if (!/[0-9]/.test(password)) {
    errorMessage += 'Kamida bitta raqam bo\'lishi kerak. ';
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errorMessage += 'Kamida bitta maxsus belgi bo\'lishi kerak (!@#$%^&*).';
  }

  passwordError.textContent = errorMessage;
});

// Daromad hisoblash
const incomeForm = document.getElementById('income-form');
const incomeInput = document.getElementById('income');
const totalIncomeDisplay = document.getElementById('total-income');

let totalIncome = 0;

incomeForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const income = parseFloat(incomeInput.value);
  if (!isNaN(income)) {
    totalIncome += income;
    totalIncomeDisplay.textContent = `Jami daromad: ${totalIncome} so'm`;
    incomeInput.value = '';
  }
});

// Ro'yxatdan o'tish formasi (ma'lumotlar serverga yuborilmaydi - namuna uchun)
const registrationForm = document.getElementById('registration-form');
registrationForm.addEventListener('submit', function (event) {
  event.preventDefault();
  if (passwordError.textContent === '' && usernameInput.value) {
    alert('Ro\'yxatdan muvaffaqiyatli o\'tdingiz!');
  } else {
    alert('Iltimos, barcha maydonlarni to\'g\'ri to\'ldiring.');
  }
});
