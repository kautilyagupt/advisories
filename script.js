const boardElement = document.getElementById('board');
const statusElement = document.getElementById('current-player');
const restartButton = document.getElementById('restart');
const cells = Array.from(document.querySelectorAll('.cell'));

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let boardState = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

function updateStatus() {
  statusElement.textContent = gameActive ? currentPlayer : 'Game over';
}

function handleCellClick(event) {
  const index = Number(event.target.dataset.index);

  if (!gameActive || boardState[index]) {
    return;
  }

  boardState[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.disabled = true;

  if (checkWinner()) {
    gameActive = false;
    statusElement.textContent = `${currentPlayer} wins!`;
    highlightWinningLine();
    return;
  }

  if (boardState.every(cell => cell)) {
    gameActive = false;
    statusElement.textContent = 'Tie game';
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
}

function checkWinner() {
  return WINNING_LINES.some(line => {
    const [a, b, c] = line;
    return (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    );
  });
}

function highlightWinningLine() {
  const winningLine = WINNING_LINES.find(line => {
    const [a, b, c] = line;
    return (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    );
  });

  if (!winningLine) return;

  winningLine.forEach(index => {
    cells[index].style.background = 'linear-gradient(135deg, #34d399, #38bdf8)';
    cells[index].style.color = '#0f172a';
  });
}

function restartGame() {
  boardState.fill('');
  currentPlayer = 'X';
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.disabled = false;
    cell.style.background = '';
    cell.style.color = '';
  });
  updateStatus();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
updateStatus();
