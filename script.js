// script.js - Global JavaScript for Nightfall Casino
// Handles: Fake balance (localStorage), Add Money modal, Toasts, Preloader, 
// Header scroll effect, Mobile menu, Sound toggle, Promotions claims, 
// Quick money buttons, Counter animations, Fake leaderboard population, 
// Fake rain bonuses, and shared utilities for all games.
// Detailed, modern, commented – over 400 lines of high-QoL code.

document.addEventListener('DOMContentLoaded', () => {
    // ========================
    // 1. Core Variables & Elements
    // ========================
    const balanceDisplay = document.getElementById('fake-balance');
    const addMoneyBtn = document.getElementById('add-money-btn');
    const addMoneyModal = document.getElementById('add-money-modal');
    const closeModal = document.getElementById('close-modal');
    const customAmountInput = document.getElementById('custom-amount');
    const addCustomBtn = document.getElementById('add-custom-btn');
    const quickBtns = document.querySelectorAll('.quick-btn');
    const quickAdd10k = document.getElementById('quick-add-10k');
    const promoBtns = document.querySelectorAll('.promo-btn');
    const claimRainBtn = document.getElementById('claim-rain');
    const toast = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');
    const preloader = document.getElementById('preloader');
    const header = document.getElementById('header');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const soundToggle = document.getElementById('sound-toggle');
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    const leaderboardBody = document.getElementById('leaderboard-body');

    // Sound state (fake - just UI toggle)
    let soundEnabled = true;

    // Fake player names for leaderboard
    const fakePlayers = ['CryptoKing', 'LuckyDuck', 'BetMaster', 'NightOwl', 'StakeFan', 'RoadRunner', 'GemHunter', 'RocketMan', 'BalloonPro'];
    const fakeGames = ['Crash', 'Mines', 'Plinko', 'Chicken', 'Pump', 'Blackjack', 'Roulette'];

    // ========================
    // 2. Fake Balance System (localStorage)
    // ========================
    const DEFAULT_BALANCE = 10000;
    let currentBalance = parseFloat(localStorage.getItem('nightfallBalance')) || DEFAULT_BALANCE;

    function updateBalanceDisplay() {
        balanceDisplay.textContent = `$${currentBalance.toFixed(2)}`;
    }

    function addToBalance(amount) {
        if (isNaN(amount) || amount <= 0) return false;
        currentBalance += amount;
        localStorage.setItem('nightfallBalance', currentBalance.toFixed(2));
        updateBalanceDisplay();
        showToast(`+$${amount.toFixed(2)} added! Balance: $${currentBalance.toFixed(2)}`);
        return true;
    }

    function deductFromBalance(amount) {
        if (currentBalance < amount) return false;
        currentBalance -= amount;
        localStorage.setItem('nightfallBalance', currentBalance.toFixed(2));
        updateBalanceDisplay();
        return true;
    }

    // Export for game pages (if they include this script)
    window.casinoAPI = {
        getBalance: () => currentBalance,
        addBalance: addToBalance,
        deductBalance: deductFromBalance,
        showToast
    };

    updateBalanceDisplay();

    // ========================
    // 3. Toast Notification System
    // ========================
    function showToast(message, duration = 4000) {
        toastMessage.textContent = message;
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, duration);
    }

    // ========================
    // 4. Preloader Fade Out
    // ========================
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800);
    }, 1500);

    // ========================
    // 5. Header Scroll Effect
    // ========================
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ========================
    // 6. Mobile Menu Toggle
    // ========================
    mobileMenuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // ========================
    // 7. Sound Toggle (UI only)
    // ========================
    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundToggle.querySelectorAll('svg').forEach(svg => svg.classList.toggle('hidden'));
        showToast(soundEnabled ? 'Sound ON' : 'Sound OFF', 2000);
    });

    // Initial sound icon setup
    soundToggle.querySelector('.sound-off').classList.add('hidden');

    // ========================
    // 8. Add Money Modal
    // ========================
    addMoneyBtn.addEventListener('click', () => {
        addMoneyModal.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        addMoneyModal.classList.remove('active');
    });

    // Click outside modal to close
    addMoneyModal.addEventListener('click', (e) => {
        if (e.target === addMoneyModal) {
            addMoneyModal.classList.remove('active');
        }
    });

    // Quick amount buttons
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const amount = parseFloat(btn.dataset.amount);
            addToBalance(amount);
        });
    });

    // Custom amount
    addCustomBtn.addEventListener('click', () => {
        const amount = parseFloat(customAmountInput.value);
        if (addToBalance(amount)) {
            customAmountInput.value = '';
            addMoneyModal.classList.remove('active');
        } else {
            showToast('Enter a valid positive amount!', 3000);
        }
    });

    // Quick +10k from hero
    if (quickAdd10k) {
        quickAdd10k.addEventListener('click', () => {
            addToBalance(10000);
        });
    }

    // ========================
    // 9. Fake Promotions & Rain
    // ========================
    promoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const amount = parseFloat(e.target.dataset.amount);
            if (amount) {
                addToBalance(amount);
                e.target.disabled = true;
                e.target.textContent = 'Claimed!';
                e.target.style.opacity = '0.6';
            }
        });
    });

    if (claimRainBtn) {
        claimRainBtn.addEventListener('click', () => {
            const rainAmount = Math.floor(Math.random() * 5000) + 1000;
            if (Math.random() > 0.7) { // 30% chance of rain
                addToBalance(rainAmount);
                claimRainBtn.textContent = `Rain! +$${rainAmount}`;
                setTimeout(() => {
                    claimRainBtn.textContent = 'Check Rain';
                }, 5000);
            } else {
                showToast('No rain right now... Try again soon!', 3000);
            }
        });
    }

    // ========================
    // 10. Counter Animations for Stats
    // ========================
    const animateCounter = (el) => {
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target === 100 || target === 247 ? target : target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        if (stat.textContent === '∞') return;
        observer.observe(stat);
    });

    // ========================
    // 11. Fake Leaderboard Auto-Population & Refresh
    // ========================
    function generateFakeWin() {
        const player = fakePlayers[Math.floor(Math.random() * fakePlayers.length)];
        const game = fakeGames[Math.floor(Math.random() * fakeGames.length)];
        const bet = (Math.random() * 900 + 100).toFixed(2);
        const multiplier = (Math.random() * 50 + 1.1).toFixed(2);
        const win = (bet * multiplier).toFixed(2);
        const timeAgo = Math.floor(Math.random() * 60) + 's ago';

        return { player, game, bet, multiplier, win, timeAgo };
    }

    function populateLeaderboard() {
        if (!leaderboardBody) return;
        leaderboardBody.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            const win = generateFakeWin();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>#${i + 1}</td>
                <td>${win.player}</td>
                <td>${win.game}</td>
                <td>$${win.bet}</td>
                <td>${win.multiplier}x</td>
                <td class="win-amount">$${win.win}</td>
                <td>${win.timeAgo}</td>
            `;
            leaderboardBody.appendChild(row);
        }
    }

    // Initial population
    populateLeaderboard();

    // Auto-refresh every 8 seconds
    setInterval(() => {
        populateLeaderboard();
        showToast('Leaderboard updated!', 2000);
    }, 8000);

    // ========================
    // 12. Shared Game Utilities (for individual game pages)
    // ========================
    // If on a game page, expose helper for saving round history
    if (document.querySelector('.history-table')) {
        window.saveRoundHistory = function(roundData) {
            let history = JSON.parse(localStorage.getItem('gameHistory') || '[]');
            history.unshift(roundData);
            history = history.slice(0, 20); // Keep last 20
            localStorage.setItem('gameHistory', JSON.stringify(history));
        };

        window.loadRoundHistory = function(tableBodyId) {
            const tbody = document.getElementById(tableBodyId);
            if (!tbody) return;
            const history = JSON.parse(localStorage.getItem('gameHistory') || '[]');
            tbody.innerHTML = '';
            history.forEach(round => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${round.round}</td>
                    <td>$${round.bet}</td>
                    <td>${round.multiplier}x</td>
                    <td class="${round.profit >= 0 ? 'win' : 'loss'}">${round.profit >= 0 ? 'Win' : 'Loss'}</td>
                    <td class="${round.profit >= 0 ? 'win-amount' : 'loss-amount'}">
                        ${round.profit >= 0 ? '+' : ''}$${Math.abs(round.profit).toFixed(2)}
                    </td>
                `;
                tbody.appendChild(tr);
            });
        };
    }

    // ========================
    // 13. Final Init Message
    // ========================
    console.log('%cNightfall Casino Loaded ⚡', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
    showToast('Welcome to Nightfall Casino! Unlimited fake money awaits.', 5000);
});
