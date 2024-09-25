// // Ro'yxatdan o'tish funk
// document.getElementById('register-form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const username = document.getElementById('username').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     fetch('/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, email, password }),
//     })
//     .then(response => {
//         console.log(response);
//         return response.json();
//     })
//     .then(data => {
//         console.log('Serverdan kelgan javob:', data);
//         document.getElementById('message').innerText = data.message;
//     })
//     .catch(error => {
//         console.log('Xatolik:', error);
//         document.getElementById('message').innerText = 'Xatolik yuz berdi';
//     });
// });
    


// // Login funksiyasi
// document.getElementById('login-form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const username = document.getElementById('login-username').value;
//     const password = document.getElementById('login-password').value;

//     fetch('/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             window.location.href = 'dashboard.html';
//         } else {
//             document.getElementById('message').innerText = data.message;
//         }
//     })
//     .catch(error => {
//         document.getElementById('message').innerText = 'Xatolik yuz berdi';
//     });
// });
