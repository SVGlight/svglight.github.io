// Initialize variables
let currentBalance = parseInt(localStorage.getItem('balance')) || 0;
let autoAdding = false;
let autoAddInterval = null;
let currentTipIndex = 0;
const tips = [
  "Start small and enjoy the process.",
  "Manage your funds wisely.",
  "Explore all games for fun."
];

// Update balance display
function updateBalance() {
  document.getElementById('balance').innerText = 'Balance: ' + currentBalance;
  document.getElementById('balance-overview').innerText = currentBalance;
  document.getElementById('debugBalance').innerText = currentBalance;
}
updateBalance();

// Add funds manually
document.getElementById('addMoneyBtn').addEventListener('click', () => {
  const amount = parseInt(document.getElementById('addAmount').value);
  if(amount && amount > 0){
    currentBalance += amount;
    localStorage.setItem('balance', currentBalance);
    updateBalance();
    addActivity(`Added ${amount} fake dollars.`);
    document.getElementById('addAmount').value = '';
  } else {
    alert('Enter a valid amount');
  }
});

// Reset balance
document.getElementById('resetBalanceBtn').addEventListener('click', () => {
  currentBalance = 0;
  localStorage.setItem('balance', currentBalance);
  updateBalance();
  addActivity('Balance reset to 0.');
});

// Quick bet of 100
document.getElementById('quickBetBtn').addEventListener('click', () => {
  if(currentBalance >= 100){
    currentBalance -= 100;
    localStorage.setItem('balance', currentBalance);
    updateBalance();
    addActivity('Placed a quick bet of 100.');
  } else {
    alert('Not enough balance.');
  }
});

// Auto-Add funds toggle
document.getElementById('autoAddBtn').addEventListener('click', () => {
  if(autoAdding){
    clearInterval(autoAddInterval);
    autoAdding = false;
    document.getElementById('autoAddBtn').innerText = 'Auto-Add +10/sec';
  } else {
    autoAddInterval = setInterval(() => {
      currentBalance += 10;
      localStorage.setItem('balance', currentBalance);
      updateBalance();
      addActivity('Auto-added 10 fake dollars.');
    }, 1000);
    autoAdding = true;
    document.getElementById('autoAddBtn').innerText = 'Stop Auto-Add';
  }
});

// Tips carousel navigation
document.getElementById('nextTipBtn').addEventListener('click', () => {
  const tipsSlides = document.querySelectorAll('.tips-slide');
  tipsSlides.forEach((slide, index) => {
    slide.classList.toggle('active', index === (currentTipIndex + 1) % tips.length);
  });
  currentTipIndex = (currentTipIndex + 1) % tips.length;
});

// Theme switch toggle
document.getElementById('themeSwitch').addEventListener('change', (e) => {
  document.body.classList.toggle('dark-mode', e.target.checked);
});

// Avatar upload
document.getElementById('userAvatar').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = () => {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById('userAvatar').src = reader.result;
    };
    reader.readAsDataURL(file);
  };
  input.click();
});

// Feedback modal open/close
const feedbackModal = document.getElementById('feedbackModal');
document.getElementById('feedbackBtn').onclick = () => { feedbackModal.style.display = 'block'; };
document.getElementById('closeFeedback').onclick = () => { feedbackModal.style.display = 'none'; };
window.onclick = (event) => {
  if(event.target == feedbackModal) feedbackModal.style.display = 'none';
};
// Feedback form submission
document.getElementById('feedbackForm').onsubmit = (e) => {
  e.preventDefault();
  alert('Thank you for your feedback!');
  document.getElementById('feedbackForm').reset();
  feedbackModal.style.display = 'none';
};

// Achievements modal
const achieveModal = document.getElementById('achieveModal');
document.getElementById('closeAchieve').onclick = () => { achievementModalClose(); };
// Show achievements after some actions, for demo
setTimeout(() => { achievementModalOpen(); }, 5000);
function achievementModalOpen() {
  document.getElementById('achieveModal').style.display = 'block';
}
function achievementModalClose() {
  document.getElementById('achieveModal').style.display = 'none';
}

// Debug info toggle
document.addEventListener('keydown', (e) => {
  if(e.key === 'd'){
    document.getElementById('debugPanel').style.display = 'block';
  }
});

// Optional: Add more interactive features as needed
// Example: simulate game results, achievements unlocking, etc.
