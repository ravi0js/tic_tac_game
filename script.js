// Select the board element from the HTML
const board = document.querySelector(".board");

// Initialize the current player as "X"
let currentPlayer = "X";

// Initialize the winner as null
let winner = null;

// Create an array to represent the 9 cells of the board, initially all set to null
const cells = Array.from({ length: 9 }).fill(null);

// Function to check if there's a winner
function checkWinner() {
  // Define the winning conditions (rows, columns, and diagonals)
  const winningConditions = [
    [0, 1, 2], // first row
    [3, 4, 5], // second row
    [6, 7, 8], // third row
    [0, 3, 6], // first column
    [1, 4, 7], // second column
    [2, 5, 8], // third column
    [0, 4, 8], // main diagonal
    [2, 4, 6], // secondary diagonal
  ];

  // Check each winning condition
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a]; // Return the winning player ("X" or "O")
    }
  }

  return null; // Return null if there's no winner
}

// Function to handle clicking on a cell
function handleCellClick(index) {
  if (winner || cells[index]) return; // Do nothing if the game is over or the cell is already filled

  // Update the cell with the current player's symbol
  cells[index] = currentPlayer;

  // Re-render the board to reflect the current state
  render();

  // Check if there's a winner
  winner = checkWinner();

  if (winner) {
    // If there's a winner, display the message and reset the game after a short delay
    setTimeout(() => {
      displayMessage(`Player ${winner} wins!`);
      resetGame();
    }, 100);
  } else if (!cells.includes(null)) {
    // If all cells are filled and there's no winner, it's a tie
    setTimeout(() => {
      displayMessage("It's a tie!");
      resetGame();
    }, 100);
  } else {
    // Switch to the other player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// Function to render the game board
function render() {
  // Clear the board
  board.innerHTML = "";

  // Create and append each cell to the board
  cells.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = value || ""; // Display the player's symbol or an empty string
    cell.addEventListener("click", () => handleCellClick(index)); // Add click event listener to each cell
    board.appendChild(cell); // Append the cell to the board
  });
}

// Function to reset the game
function resetGame() {
  // Reset the cells, current player, and winner
  cells.fill(null);
  currentPlayer = "X";
  winner = null;

  // Re-render the board
  render();
}

// Function to display a message
function displayMessage(msg) {
  // Create a message box element
  const messageBox = document.createElement("div");
  messageBox.classList.add("message-box");
  messageBox.textContent = msg; // Set the message text

  // Append the message box to the body
  document.body.appendChild(messageBox);

  // Remove the message box after 3 seconds
  setTimeout(() => {
    messageBox.remove();
  }, 3000);
}

// Initialize the game board
render();
