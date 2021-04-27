//Single Responsibility Principle: This is where we have a collection of smaller functions each with one main job, rather than on huge function handling everything, 

// Function List
// 1. runGame()
// 2. checkAnswer()
// 3. calculateCorrectAnswer()
// 4. incrementScore()
// 5. incrementWrongAnswer()
// 6. display questions ->
    // displayAdditionQuestion()
    // displaySubtractQuestion()
    // displayMultiplyQuestion()
    
// Code to be executed when the page has finished loading.
//Wait for the DOM (Document Object Model) to finish loading before running the game.
//Get the buttom elements and add event listeners to them

// It's going to listen for the DOM content to be loaded and then it will execute the function!
document.addEventListener("DOMContentLoaded", function() {
// We have 5 buttons in our HTML file (+, -, x, / and Submit answer button)
//Here we are using the getElementsByTagName method to return all of the listed buttons
let buttons = document.getElementsByTagName("button");
// This syntax is going to go through our buttons array(list) and return each element in the array which will be stored in that variable button on each iteration.
for (let button of buttons) {
  // Inside our 'for' loop we add the 'event listener' which is listening for that button to be clicked ('click') when the button is clicked the code inside this block will run.
  button.addEventListener("click", function() {
// We add an if statement here to check the attribute of 'data-type' and to see what its value is. If it value is 'submit' then we are going to display an alert that says "You have clicked Submit"
      if (this.getAttribute("data-type") === "submit") {
        checkAnswer();
      } else {
// This block of code is using a literal template. This will tell the user what button has been clicked.
        let gameType = this.getAttribute("data-type");
        runGame(gameType);
      }
  });
}
// This is outside the 'for' loop

// This time it's listening for a key down event, which as we said is when a key is pressed. Every event generates an object which we're passing in here to our event handler code. And this object is very, very useful because it contains lots of different things which we can check or use to fine tune what we do with our event. In this case, we're checking the key property. And we're saying that if the key that was pressed was enter then run this function.
document.getElementById("answer-box").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
})
// In order for the addition game to run we need to add it to our DOM Content Loaded Event Listener, so that our javascript knows that the addition game is fully loaded to function correctly
runGame("addition");

});

// The main game "loop", called when the script is first loaded
// and after the user's answer has been processed
// 1. runGame()
function runGame(gameType) {

// Generate two random numbers between 1 and 25
// Math.floor rounds down to the whole numbers
// Math.random generates random numbers

// So each time our run game function is called it will set the value of our answer box to an empty string in effect, it will empty it of whatever was there before.
document.getElementById("answer-box").value = "";
document.getElementById("answer-box").focus();

let num1 = Math.floor(Math.random() * 25) +1;
let num2 = Math.floor(Math.random() * 25) +1;

// Here we are passing the game type into the function as an argument, we're checking the game type parameter if it's equal to addition then it's going to display our addition question. Otherwise, it will throw an error.
if (gameType === "addition") {
  displayAdditionQuestion(num1, num2);
} 
else if (gameType === "multiply") {
    displayMultiplyQuestion(num1, num2);
} 
else if (gameType === "subtract") {
    displaySubtractQuestion(num1, num2);
} 
else if (gameType === "division") {
    displayDivisionQuestion(num1, num2);
} else {
  alert(`Unknown game type ${gameType}`);
  throw `Unknown game type ${gameType}, aborting!`;
}
}

// Called when the user clicks the Submit button or presses Enter

// 2. checkAnswer()
function checkAnswer() {

  // Checks the answer against the first element in the returned calculateCorrectAnswer array
  let userAnswer = parseInt(document.getElementById("answer-box").value);
  let calculatedAnswer = calculateRightAnswer(); // calculatedAnswer is an array
  let isCorrect = userAnswer === calculatedAnswer[0]; // isCorrect has a true or false value

  if (isCorrect) {
    alert("Hey You got it right! :D");
    incrementScore();
    } else {
      alert(`Awwwww...you answered ${userAnswer}, The correct answer was ${calculatedAnswer[0]}!`);
      incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}


// 3. calculateRightAnswer()
function calculateRightAnswer() {
  // Gets the operands (the numbers) and the operator (plus, minus etc) directly from the DOM.
  // We're going to get the inner text, the value of the element with the id of operand 1 from our HTML and assign it to our new variables. This is basically a reverse of what we did before when we set the values of operand 1, operand 2 and operator.

// The first part is just getting the values back from the dom. But notice that we're using the parse int function to make sure that we treat the value as an integer, a whole number. By default, when JavaScript gets data from the DOM it returns it as a string but it can't do mathematical operations on a string we need it to be a number. So that's why we're using parse int.
let operand1 = parseInt(document.getElementById("operand1").innerText);
let operand2 = parseInt(document.getElementById("operand2").innerText);
let operator = document.getElementById("operator").innerText;

// Here we have an if statement and the if statement is asking if the operator is equal to the plus sign, it must be the addition game and so to return our correct answer operand 1 and operand 2 and the game type.

//  in our game example, our function will have got the value of our first number, which is 10, and stored in operand 1. It will have got the value of our second number 11 and stored that in operand 2, and it will have starred the plus sign in operator. It's then going to return an array that contains two elements. The first element will be the correct answer, the result of 10 plus 11, so 21. The second will be the game type that we want to run next. So we want to keep running an addition game until our user says otherwise so that will be addition.

if (operator === "+") {
    return [operand1 + operand2, "addition"]; // return an array containing the correct answer and game type
  } else if (operator === "x") { // This is the multiply game
    return [operand1 * operand2, "multiply"]; // return an array containing the correct answer and game type
  } else if (operator === "-") { // This is the subtraction game
    return [operand1 - operand2, "subtract"]; // return an array containing the correct answer and game type
  } else if (operator === "/") { // This is the division game
    return ([operand1 / operand2, "division"]); // return an array containing the correct answer and game type
  } else {
    alert(`Unimplemented operator ${operator}`);
    throw `Unimplemented operator ${operator}, aborting!`;
  }

}



// 4. incrementScore()
function incrementScore() {
  // Gets the current score from the DOM and increments it
let oldScore = parseInt(document.getElementById('score').innerText);
document.getElementById('score').innerText = ++oldScore;
}



// 5. incrementWrongAnswer()
function incrementWrongAnswer() {
  // Gets the current tally of incorrect answers from the DOM and increments it
  let oldScore = parseInt(document.getElementById('incorrect').innerText);
document.getElementById('incorrect').innerText = ++oldScore;
}



// displayAdditionQuestion()
function displayAdditionQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "+";
}



// displaySubtractQuestion()
function displaySubtractQuestion(operand1, operand2) {
  // Here we ask the question: Which is bigger, operand 1 or operand 2?
  // If operand1 is bigger, return that.
  // If operand 2 is bigger, return that instead.
  // condition ? true part : false part 
  document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
  document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
  document.getElementById("operator").textContent = "-";
}



// displayMultiplyQuestion()
function displayMultiplyQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "x";
}

// displayDivisionQuestion()
function displayDivisionQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
  document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
  document.getElementById("operator").textContent = "/";
}
