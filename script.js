const statusElement = document.getElementById('current-player');
const modeLabelElement = document.getElementById('mode-label');
const restartButton = document.getElementById('restart');
const modeButtons = Array.from(document.querySelectorAll('.mode-btn'));
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
let gameMode = 'single';
const humanPlayer = 'X';
const computerPlayer = 'O';

function updateStatus() {
  if (!gameActive) {
    statusElement.textContent = getOutcomeMessage();
    return;
  }

  if (gameMode === 'single' && currentPlayer === computerPlayer) {
    statusElement.textContent = 'Computer is thinking...';
    return;
  }

  if (gameMode === 'single') {
    statusElement.textContent = 'Your turn';
    return;
  }

  statusElement.textContent = `Player ${currentPlayer}'s turn`;
}

function getOutcomeMessage() {
  const winner = getWinner(boardState);

  if (winner === humanPlayer) return 'You win!';
  if (winner === computerPlayer) return 'Computer wins!';
  return 'Tie game';
}

function handleCellClick(event) {
  const index = Number(event.target.dataset.index);

  if (!gameActive || boardState[index]) {
    return;
  }

  if (gameMode === 'single' && currentPlayer === computerPlayer) {
    return;
  }

  playMove(index, currentPlayer, event.target);

  if (!gameActive) {
    return;
  }

  if (gameMode === 'single') {
    currentPlayer = computerPlayer;
    updateStatus();
    window.setTimeout(playComputerMove, 450);
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
}

function playMove(index, player, cell) {
  if (!gameActive || boardState[index]) {
    return;
  }

  boardState[index] = player;
  if (cell) {
    cell.textContent = player;
    cell.disabled = true;
  }

  const winner = getWinner(boardState);
  if (winner) {
    gameActive = false;
    highlightWinningLine();
    updateStatus();
    return;
  }

  if (boardState.every(square => square)) {
    gameActive = false;
    updateStatus();
  }
}

function getWinner(board) {
  return WINNING_LINES.find(line => {
    const [a, b, c] = line;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  })
    ? board[WINNING_LINES.find(line => {
        const [a, b, c] = line;
        return board[a] && board[a] === board[b] && board[a] === board[c];
      })[0]]
    : null;
}

function getWinningLine(board) {
  return WINNING_LINES.find(line => {
    const [a, b, c] = line;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  }) || null;
}

function highlightWinningLine() {
  const winningLine = getWinningLine(boardState);

  if (!winningLine) return;

  winningLine.forEach(index => {
    cells[index].style.background = 'linear-gradient(135deg, #34d399, #38bdf8)';
    cells[index].style.color = '#0f172a';
  });
}

function playComputerMove() {
  if (!gameActive || gameMode !== 'single' || currentPlayer !== computerPlayer) {
    return;
  }

  const bestMove = getBestMove(boardState);
  if (bestMove === null) {
    return;
  }

  playMove(bestMove, computerPlayer, cells[bestMove]);

  if (!gameActive) {
    return;
  }

  currentPlayer = humanPlayer;
  updateStatus();
}

function getBestMove(board) {
  const availableMoves = board
    .map((value, index) => (value === '' ? index : null))
    .filter(index => index !== null);

  if (!availableMoves.length) {
    return null;
  }

  const priorityOrder = [4, 0, 2, 6, 8, 1, 3, 5, 7];
  const scores = availableMoves.map(index => ({
    index,
    score: minimax([...board], computerPlayer, index),
  }));

  const bestScore = Math.max(...scores.map(entry => entry.score));
  const bestMoves = scores.filter(entry => entry.score === bestScore);
  const orderedMoves = bestMoves.sort((a, b) => priorityOrder.indexOf(a.index) - priorityOrder.indexOf(b.index));

  return orderedMoves[0]?.index ?? null;
}

function minimax(board, currentTurn, lastMove) {
  const winner = getWinner(board);

  if (winner === computerPlayer) {
    return 10;
  }

  if (winner === humanPlayer) {
    return -10;
  }

  if (!board.includes('')) {
    return 0;
  }

  const availableMoves = board
    .map((value, index) => (value === '' ? index : null))
    .filter(index => index !== null);

  if (currentTurn === computerPlayer) {
    let bestScore = -Infinity;
    availableMoves.forEach(index => {
      const nextBoard = [...board];
      nextBoard[index] = computerPlayer;
      bestScore = Math.max(bestScore, minimax(nextBoard, humanPlayer, index));
    });
    return bestScore;
  }

  let bestScore = Infinity;
  availableMoves.forEach(index => {
    const nextBoard = [...board];
    nextBoard[index] = humanPlayer;
    bestScore = Math.min(bestScore, minimax(nextBoard, computerPlayer, index));
  });
  return bestScore;
}

function restartGame() {
  boardState.fill('');
  currentPlayer = humanPlayer;
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.disabled = false;
    cell.style.background = '';
    cell.style.color = '';
  });
  updateStatus();
}

function setGameMode(mode) {
  gameMode = mode;
  modeLabelElement.textContent = mode === 'single' ? 'Single Player' : 'Two Player';
  modeButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.mode === mode);
  });
  restartGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
modeButtons.forEach(button => button.addEventListener('click', () => setGameMode(button.dataset.mode)));
updateStatus();
