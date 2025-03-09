// Coffee Shop - script.js

async function signup() {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    try {
        const res = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        alert(data.message);
    } catch (err) {
        console.error('Signup Error:', err);
        alert('Something went wrong!');
    }
}

async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    try {
        const res = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.token) {
            alert('Login Successful!');
            showMenu();
            fetchMenu();
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error('Login Error:', err);
        alert('Something went wrong!');
    }
}

async function fetchMenu() {
    try {
        const res = await fetch('http://localhost:5000/menu');
        const menu = await res.json();
        const menuDiv = document.getElementById('menuItems');
        menuDiv.innerHTML = menu.map(item => `<p>${item.name} - ₹${item.price}</p>`).join('');
    } catch (err) {
        console.error('Menu Fetch Error:', err);
        alert('Failed to load menu!');
    }
}

function showSignup() {
    document.getElementById('signup').style.display = 'block';
    document.getElementById('login').style.display = 'none';
}

function showLogin() {
    document.getElementById('signup').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}

function showMenu() {
    document.getElementById('menu').style.display = 'block';
}
