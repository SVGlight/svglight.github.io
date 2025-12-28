const STORAGE_KEYS = {
balance: "nightfall_balance",
theme: "nightfall_theme"
}

let balance = 0
let theme = "dark"

function init() {
loadTheme()
loadBalance()
bindUI()
renderBalance()
}

function bindUI() {
const themeBtn = document.getElementById("themeToggle")
const openWalletBtn = document.getElementById("openWalletModal")
const closeWalletBtn = document.getElementById("closeWalletModal")
const confirmAddBtn = document.getElementById("addBalanceConfirm")

if (themeBtn) {
themeBtn.addEventListener("click", toggleTheme)
}

if (openWalletBtn) {
openWalletBtn.addEventListener("click", openWalletModal)
}

if (closeWalletBtn) {
closeWalletBtn.addEventListener("click", closeWalletModal)
}

if (confirmAddBtn) {
confirmAddBtn.addEventListener("click", confirmAddBalance)
}

window.addEventListener("keydown", e => {
if (e.key === "Escape") closeWalletModal()
})
}

function loadBalance() {
const stored = localStorage.getItem(STORAGE_KEYS.balance)
if (stored === null) {
balance = 1000
saveBalance()
} else {
balance = Number(stored)
if (isNaN(balance)) {
balance = 1000
saveBalance()
}
}
}

function saveBalance() {
localStorage.setItem(STORAGE_KEYS.balance", balance)
}

function renderBalance() {
const display = document.getElementById("balanceDisplay")
if (display) {
display.innerText = "$" + format(balance)
}
}

function format(num) {
return Number(num).toLocaleString(undefined, {
minimumFractionDigits: 2,
maximumFractionDigits: 2
})
}

function addBalance(amount) {
amount = Number(amount)
if (isNaN(amount)) return false
if (amount <= 0) return false
balance += amount
saveBalance()
renderBalance()
return true
}

function subtractBalance(amount) {
amount = Number(amount)
if (isNaN(amount)) return false
if (amount <= 0) return false
if (balance < amount) return false
balance -= amount
saveBalance()
renderBalance()
return true
}

function loadTheme() {
const stored = localStorage.getItem(STORAGE_KEYS.theme)
if (stored === "light" || stored === "dark") {
theme = stored
} else {
theme = "dark"
}
applyTheme()
}

function saveTheme() {
localStorage.setItem(STORAGE_KEYS.theme, theme)
}

function applyTheme() {
if (theme === "light") {
document.body.classList.add("light")
} else {
document.body.classList.remove("light")
}
}

function toggleTheme() {
theme = theme === "dark" ? "light" : "dark"
saveTheme()
applyTheme()
}

function openWalletModal() {
const modal = document.getElementById("walletModal")
const input = document.getElementById("addAmount")
if (!modal) return
modal.classList.remove("hidden")
if (input) {
input.value = ""
setTimeout(() => input.focus(), 50)
}
}

function closeWalletModal() {
const modal = document.getElementById("walletModal")
if (!modal) return
modal.classList.add("hidden")
}

function confirmAddBalance() {
const input = document.getElementById("addAmount")
if (!input) return
const value = Number(input.value)
if (addBalance(value)) {
closeWalletModal()
} else {
input.value = ""
}
}

function getBalance() {
return balance
}

function canBet(amount) {
amount = Number(amount)
if (isNaN(amount)) return false
if (amount <= 0) return false
return balance >= amount
}

function placeBet(amount) {
if (!canBet(amount)) return false
subtractBalance(amount)
return true
}

function payout(amount) {
addBalance(amount)
}

function resetBalance() {
balance = 1000
saveBalance()
renderBalance()
}

function clamp(val, min, max) {
return Math.min(Math.max(val, min), max)
}

function randomFloat(min, max) {
return Math.random() * (max - min) + min
}

function randomInt(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min
}

function shuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1))
const temp = array[i]
array[i] = array[j]
array[j] = temp
}
return array
}

function delay(ms) {
return new Promise(resolve => setTimeout(resolve, ms))
}

function showTempMessage(text, duration = 1500) {
let el = document.createElement("div")
el.style.position = "fixed"
el.style.bottom = "30px"
el.style.left = "50%"
el.style.transform = "translateX(-50%)"
el.style.background = "var(--bg-card)"
el.style.color = "var(--text-main)"
el.style.padding = "12px 18px"
el.style.borderRadius = "10px"
el.style.boxShadow = "var(--shadow-card)"
el.style.zIndex = "9999"
el.innerText = text
document.body.appendChild(el)
setTimeout(() => {
el.remove()
}, duration)
}

function isMobile() {
return window.innerWidth <= 768
}

function syncAcrossTabs() {
window.addEventListener("storage", e => {
if (e.key === STORAGE_KEYS.balance) {
balance = Number(e.newValue) || balance
renderBalance()
}
if (e.key === STORAGE_KEYS.theme) {
theme = e.newValue === "light" ? "light" : "dark"
applyTheme()
}
})
}

syncAcrossTabs()

document.addEventListener("DOMContentLoaded", init)
