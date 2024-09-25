// Ro'yxatdan o'tish
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Ro'yxatdan o'tishni serverga yuborish
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
    });
});

// Login qilish
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Login qilishni serverga yuborish
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'dashboard.html';
        } else {
            document.getElementById('message').innerText = data.message;
        }
    });
});

// Kunlik daromadni qo'shish
let totalIncome = 0;
document.getElementById('add-income-btn').addEventListener('click', function() {
    const dailyIncome = parseFloat(document.getElementById('daily-income').value);

    if (!isNaN(dailyIncome)) {
        totalIncome += dailyIncome;
        document.getElementById('total-income').innerText = `Umumiy daromad: ${totalIncome} so'm`;
    } else {
        document.getElementById('total-income').innerText = 'Iltimos, to\'g\'ri raqam kiriting!';
    }
});

// Chiqish
document.getElementById('logout-btn').addEventListener('click', function() {
    window.location.href = 'index.html';
});
