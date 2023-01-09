class Calculator {
	constructor(prevOperandEle, curOperandEle) {
		this.prevOperandEle = prevOperandEle;
		this.curOperandEle = curOperandEle;
		this.clear();
	}
	clear() {
		this.currentOperand = "";
		this.previousOperand = "";
		this.operation = undefined;
	}
	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	appendNumber(number) {
		if (number == "." && this.currentOperand.includes(".")) return;
		this.currentOperand =
			this.currentOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.currentOperand === "") return;
		if (this.previousOperand !== "") {
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = "";
	}

	compute() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case "+":
				computation = prev + current;
				break;
			case "-":
				computation = prev - current;
				break;
			case "X":
				computation = prev * current;
				break;
			case "/":
				computation = prev / current;
				break;
			default:
				return;
		}
		this.currentOperand = computation;
		this.operation = undefined;
		this.previousOperand = "";
	}
	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split(".")[0]);
		//console.log("before . -" + stringNumber.split(".")[0]);
		const decimalDigits = stringNumber.split(".")[1];
		//console.log("after . -" + stringNumber.split(".")[1]);
		let integerDisplay;

		if (isNaN(integerDigits)) {
			integerDisplay = "";
		} else {
			integerDisplay = integerDigits.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
		}

		if (decimalDigits != null) {
			console.log("deci digi = " + decimalDigits);
			if (integerDisplay === "") {
				integerDisplay = "0";
			}
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			console.log("deci digi null");
			return integerDisplay;
		}
	}

	updatedisplay() {
		this.curOperandEle.innerText = this.getDisplayNumber(
			this.currentOperand
		);
		if (this.operation != null) {
			this.prevOperandEle.innerText = `${this.getDisplayNumber(
				this.previousOperand
			)}${this.operation}`;
		} else {
			this.prevOperandEle.innerText = "";
		}
	}
}

//get html ele as const
const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allclearButton = document.querySelector("[data-all-clear]");
const prevOperandEle = document.querySelector("[data-previous-oprnd]");
const curOperandEle = document.querySelector("[data-current-oprnd]");

const calobj = new Calculator(prevOperandEle, curOperandEle);

numberButton.forEach((button) => {
	button.addEventListener("click", () => {
		calobj.appendNumber(button.innerText);
		calobj.updatedisplay();
	});
});

operationButton.forEach((button) => {
	button.addEventListener("click", () => {
		calobj.chooseOperation(button.innerText);
		calobj.updatedisplay();
	});
});

deleteButton.addEventListener("click", (button) => {
	calobj.delete();
	calobj.updatedisplay();
});

allclearButton.addEventListener("click", (button) => {
	calobj.clear();
	calobj.updatedisplay();
});

equalButton.addEventListener("click", (button) => {
	calobj.compute();
	calobj.updatedisplay();
});
