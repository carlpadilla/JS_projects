/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// game values

let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3

// UI Elements

const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-value"),
  guessInput = document.querySelector("#guess-input "),
  message = document.querySelector(".message")

//assign UI min and Max
minNum.textContent = min
maxNum.textContent = max

//play again listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload()
    guessInput.value = ""
  }
})

// Listen for guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value)

  //validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red")
  }

  //check for wining num
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WIN!!`)
  } else {
    // wrong number
    guessesLeft -= 1
    if (guessesLeft === 0) {
      gameOver(false, `Game Over, you lost. Winning number was ${winningNum}`)
    } else {
      //answered wrong continue

      // change border color when guess is incorrect
      guessInput.style.borderColor = "red"
      guessInput.value = ""

      setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, "red")
    }
  }
})

//game over
function gameOver(won, msg) {
  let color
  won === true ? (color = "green") : (color = "red")

  //disable input
  guessInput.disabled = true
  // change border color
  guessInput.style.borderColor = color
  //set text color
  message.style.color = color
  //set message
  setMessage(msg)
  //play again
  guessBtn.value = "Play Again"
  guessBtn.className += "play-again"
}

//get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//set message
function setMessage(msg, color) {
  message.style.color = color
  message.textContent = msg
}
