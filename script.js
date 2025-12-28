// Balance Management
let balance = parseFloat(localStorage.getItem('balance')) || 1000;

function updateBalance(amount) {
    balance = parseFloat(balance) + parseFloat(amount);
    localStorage.setItem('balance', balance);
    const balanceEl = document.getElementById('balance');
    if (balanceEl) {
        balanceEl.textContent = balance.toFixed(2);
    }
}

function getBalance() {
    return parseFloat(localStorage.getItem('balance')) || 1000;
}

function setBalance(amount) {
    balance = parseFloat(amount);
    localStorage.setItem('balance', balance);
    const balanceEl = document.getElementById('balance');
    if (balanceEl) {
        balanceEl.textContent = balance.toFixed(2);
    }
}

// Initialize balance display
document.addEventListener('DOMContentLoaded', () => {
    balance = getBalance();
    const balanceEl = document.getElementById('balance');
    if (balanceEl) {
        balanceEl.textContent = balance.toFixed(2);
    }
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggle) themeToggle.textContent = '☀️';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '☀️';
        }
    });
}

// Add Money Modal
const addMoneyBtn = document.getElementById('addMoneyBtn');
const addMoneyModal = document.getElementById('addMoneyModal');
const closeModal = document.querySelector('.close');
const confirmAddMoney = document.getElementById('confirmAddMoney');

if (addMoneyBtn) {
    addMoneyBtn.addEventListener('click', () => {
        addMoneyModal.style.display = 'block';
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        addMoneyModal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === addMoneyModal) {
        addMoneyModal.style.display = 'none';
    }
});

if (confirmAddMoney) {
    confirmAddMoney.addEventListener('click', () => {
        const amount = parseFloat(document.getElementById('moneyAmount').value);
        if (amount && amount > 0) {
            updateBalance(amount);
            addMoneyModal.style.display = 'none';
            document.getElementById('moneyAmount').value = '';
        }
    });
}
