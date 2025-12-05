// Get the modal element
var modal = document.getElementById("keypad-modal");
// Get the input field
var codeInput = document.getElementById("code-input");
// Define the correct code
const CORRECT_CODE = "6741";
// Get the error message paragraph
var errorMessage = document.getElementById("error-message");

// Function to open the modal
function openKeypad() {
    modal.style.display = "block";
    codeInput.value = ''; // Clear input when opening
    errorMessage.textContent = ''; // Clear errors
}

// Function to close the modal
function closeKeypad() {
    modal.style.display = "none";
}

// Function to add key presses to the input field
function pressKey(key) {
    // Limit input length for visual clarity
    if (codeInput.value.length < 10) { 
        codeInput.value += key;
    }
    errorMessage.textContent = ''; // Clear errors when typing
}

// Function to clear the input field
function clearInput() {
    codeInput.value = '';
}

// Function to check the entered code
function checkCode() {
    if (codeInput.value === CORRECT_CODE) {
        // Correct code entered!
        // Redirect the user to the secret games page.
        window.location.href = "games.html"; 
    } else {
        // Incorrect code
        errorMessage.textContent = "Invalid code. Please try again.";
        codeInput.value = ''; // Clear input on failure
    }
}

// Close the modal if the user clicks anywhere outside of the modal content
window.onclick = function(event) {
    if (event.target == modal) {
        closeKeypad();
    }
}
