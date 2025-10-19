const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let lastPressed = ""; // track the last pressed button

// Function to update display
function updateDisplay() {
	display.textContent = currentInput || "0";
}

// Handle button clicks
buttons.forEach((button) => {
	button.addEventListener("click", () => {
		handleInput(button.textContent);
	});
});

// Handle keyboard input
document.addEventListener("keydown", (e) => {
	const allowedKeys = "0123456789+-*/.=";
	if (allowedKeys.includes(e.key)) {
		handleInput(e.key);
	} else if (e.key === "Enter") {
		handleInput("=");
	} else if (e.key === "Backspace") {
		currentInput = currentInput.slice(0, -1);
		updateDisplay();
		lastPressed = currentInput.slice(-1).match(/[\+\-\*\/]/)
			? "operator"
			: "number";
	} else if (e.key.toLowerCase() === "c") {
		handleInput("C");
	}
});

// Main input handler
function handleInput(value) {
	if (value === "C") {
		currentInput = "";
		lastPressed = "";
		updateDisplay();
	} else if (value === "=" || value === ".") {
		if (value === "=") {
			try {
				currentInput = eval(currentInput);
				lastPressed = "";
			} catch {
				currentInput = "";
				display.textContent = "Error";
				return;
			}
		} else {
			// Prevent multiple decimals in a number
			const parts = currentInput.split(/[\+\-\*\/]/);
			if (parts[parts.length - 1].includes(".")) return;
			currentInput += ".";
			lastPressed = "number";
		}
		updateDisplay();
	} else if ("+-*/".includes(value)) {
		if (currentInput === "" && value !== "-") return; // allow negative numbers
		if (lastPressed === "operator") return; // prevent multiple operators
		currentInput += value;
		lastPressed = "operator";
		updateDisplay();
	} else {
		// numbers
		currentInput += value;
		lastPressed = "number";
		updateDisplay();
	}
}
