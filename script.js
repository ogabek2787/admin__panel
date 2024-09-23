let token = '';

// Ro'yxatdan o'tish
function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => alert(data.message));
}

// Kirish
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        token = data.token;
        document.getElementById('auth').style.display = 'none';
        document.getElementById('tracker').style.display = 'block';
        getMonthlyTotal(); // Yangi kirgan foydalanuvchi uchun umumiy hisobni olish
    });
}

// Pul miqdorini kiritish
function addSalary() {
    const amount = document.getElementById('moneyAmount').value;

    fetch('http://localhost:3000/api/salary/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, amount }),
    })
    .then(response => response.json())
    .then(data => alert(data.message));
}

// Oylik umumiy hisobni olish va grafikani chizish
