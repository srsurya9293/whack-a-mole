const container = document.getElementById("container");
const scoreDisplay = document.getElementById("score");
const moles = document.querySelectorAll(".mole");
const restartBtn = document.getElementById("restart-btn");

let score = 0;
let activeMole = null;
let gameInterval = null;
let gameActive = true;

// Create message element dynamically
const message = document.createElement("p");
message.id = "message";
message.classList.add("hidden");
container.insertBefore(message, restartBtn);

// Randomly activate a mole
function randomMole() {
  if (!gameActive) return;

  moles.forEach((mole) => mole.classList.remove("active"));

  const randomIndex = Math.floor(Math.random() * moles.length);
  const mole = moles[randomIndex];
  mole.classList.add("active");
  activeMole = mole;
}

// Start the game
function startGame() {
  score = 0;
  gameActive = true;
  scoreDisplay.textContent = score;
  message.classList.add("hidden");

  clearInterval(gameInterval);
  gameInterval = setInterval(randomMole, 1000);
}

// Stop the game
function stopGame() {
  clearInterval(gameInterval);
  gameActive = false;
  moles.forEach((mole) => mole.classList.remove("active"));
}

// Handle mole click
moles.forEach((mole) => {
  mole.addEventListener("click", () => {
    if (!gameActive) return;

    if (mole === activeMole) {
      score++;
      scoreDisplay.textContent = score;
      mole.classList.remove("active");

      if (score === 5) {
        message.textContent = "🎉 You win! 🎉";
        message.classList.remove("hidden");
        stopGame();
      }
    }
  });
});

// Restart button
restartBtn.addEventListener("click", () => {
  stopGame();
  startGame();
});

// Start initially
startGame();