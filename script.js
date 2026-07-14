const gameTitleElement = document.getElementById('game-title');
const gameIndexElement = document.getElementById('game-index');
const statusElement = document.getElementById('game-status');
const descriptionElement = document.getElementById('game-description');
const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart');
const nextButton = document.getElementById('next-game');

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

const GAMES = [
  {
    name: 'Tic Tac Toe',
    description: 'Beat the unbeatable AI in Tic Tac Toe.',
    init: initTicTacToe,
  },
  {
    name: 'Rock Paper Scissors',
    description: 'Play best of three against the computer.',
    init: initRockPaperScissors,
  },
  {
    name: 'Guess the Number',
    description: 'Pick the secret number before your guesses run out.',
    init: initGuessTheNumber,
  },
  {
    name: 'Memory Match',
    description: 'Find the matching pairs as fast as you can.',
    init: initMemoryMatch,
  },
  {
    name: 'Simon Says',
    description: 'Repeat the color sequence correctly.',
    init: initSimonSays,
  },
  {
    name: 'Speed Tap',
    description: 'Tap the highlighted square quickly for all five rounds.',
    init: initSpeedTap,
  },
  {
    name: 'Quick Math',
    description: 'Choose the correct sum from three options.',
    init: initQuickMath,
  },
  {
    name: 'Larger Number',
    description: 'Pick the larger number to win.',
    init: initLargerNumber,
  },
  {
    name: 'Odd Color Out',
    description: 'Select the color that does not match the others.',
    init: initOddColorOut,
  },
  {
    name: 'Pattern Next',
    description: 'Choose the next item in the pattern.',
    init: initPatternNext,
  },
];

let currentGameIndex = 0;
let gameState = {};
let gameActive = true;

function updateHeader() {
  const game = GAMES[currentGameIndex];
  gameTitleElement.textContent = game.name;
  gameIndexElement.textContent = `${currentGameIndex + 1}`;
  descriptionElement.textContent = game.description;
}

function updateStatus(text) {
  statusElement.textContent = text;
}

function renderBoard(columns = 3) {
  gameBoard.innerHTML = '';
  gameBoard.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
}

function createButton(label, callback, customClass = '') {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `cell ${customClass}`.trim();
  button.textContent = label;
  button.addEventListener('click', callback);
  return button;
}

function finishGame(resultText) {
  gameActive = false;
  updateStatus(resultText);
  nextButton.disabled = false;
}

function loadGame(index) {
  currentGameIndex = index;
  gameState = {};
  gameActive = true;
  nextButton.disabled = true;
  updateHeader();
  GAMES[currentGameIndex].init();
}

function restartGame() {
  gameActive = true;
  nextButton.disabled = true;
  GAMES[currentGameIndex].init();
}

function goToNextGame() {
  const nextIndex = (currentGameIndex + 1) % GAMES.length;
  loadGame(nextIndex);
}

function initTicTacToe() {
  const board = Array(9).fill('');
  const human = 'X';
  const computer = 'O';

  renderBoard(3);
  updateStatus('Your turn.');

  board.forEach((value, index) => {
    const cell = createButton('', () => onCellClick(index), 'tic-cell');
    cell.dataset.index = index.toString();
    gameBoard.appendChild(cell);
  });

  function onCellClick(index) {
    if (!gameActive || board[index]) return;
    makeMove(index, human);
    if (!gameActive) return;
    updateStatus('Computer thinking...');
    window.setTimeout(() => {
      const move = getBestTicTacToeMove(board, computer, human);
      if (move !== null) makeMove(move, computer);
      if (gameActive) updateStatus('Your turn.');
    }, 500);
  }

  function makeMove(index, player) {
    board[index] = player;
    const cell = gameBoard.querySelector(`button[data-index='${index}']`);
    if (cell) {
      cell.textContent = player;
      cell.disabled = true;
    }

    const winner = getWinner(board);
    if (winner) {
      highlightWinningLine(board);
      finishGame(winner === human ? 'You win!' : 'Computer wins!');
      return;
    }

    if (!board.includes('')) {
      finishGame('Tie game');
    }
  }
}

function getWinner(board) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function highlightWinningLine(board) {
  const line = WINNING_LINES.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]);
  if (!line) return;
  line.forEach(index => {
    const cell = gameBoard.querySelector(`button[data-index='${index}']`);
    if (cell) {
      cell.style.background = 'linear-gradient(135deg, #34d399, #38bdf8)';
      cell.style.color = '#0f172a';
    }
  });
}

function getBestTicTacToeMove(board, computer, human) {
  const available = board.map((value, index) => (value === '' ? index : null)).filter(i => i !== null);
  if (!available.length) return null;

  const winningMove = available.find(index => {
    const next = [...board];
    next[index] = computer;
    return getWinner(next) === computer;
  });
  if (winningMove !== undefined) return winningMove;

  const blockMove = available.find(index => {
    const next = [...board];
    next[index] = human;
    return getWinner(next) === human;
  });
  if (blockMove !== undefined) return blockMove;

  if (board[4] === '') return 4;
  const preferred = [0, 2, 6, 8, 1, 3, 5, 7];
  let bestScore = -Infinity;
  let bestMove = null;

  preferred.forEach(index => {
    if (board[index] !== '') return;
    const next = [...board];
    next[index] = computer;
    const score = minimax(next, human, computer, human, 1);
    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  });

  return bestMove;
}

function minimax(board, currentTurn, computer, human, depth) {
  const winner = getWinner(board);
  if (winner === computer) return 10 - depth;
  if (winner === human) return depth - 10;
  if (!board.includes('')) return 0;

  const available = board.map((value, index) => (value === '' ? index : null)).filter(i => i !== null);
  if (currentTurn === computer) {
    let bestScore = -Infinity;
    available.forEach(index => {
      const next = [...board];
      next[index] = computer;
      bestScore = Math.max(bestScore, minimax(next, human, computer, human, depth + 1));
    });
    return bestScore;
  }

  let bestScore = Infinity;
  available.forEach(index => {
    const next = [...board];
    next[index] = human;
    bestScore = Math.min(bestScore, minimax(next, computer, computer, human, depth + 1));
  });
  return bestScore;
}

function initRockPaperScissors() {
  gameState = { humanScore: 0, computerScore: 0, rounds: 0, target: 2 };
  renderBoard(3);
  updateStatus('Pick rock, paper, or scissors.');

  ['Rock', 'Paper', 'Scissors'].forEach(choice => {
    const button = createButton(choice, () => playRound(choice.toLowerCase()));
    gameBoard.appendChild(button);
  });

  function playRound(choice) {
    if (!gameActive) return;
    const options = ['rock', 'paper', 'scissors'];
    const computerChoice = options[Math.floor(Math.random() * options.length)];
    const result = getRPSResult(choice, computerChoice);
    gameState.rounds += 1;

    if (result === 1) gameState.humanScore += 1;
    if (result === -1) gameState.computerScore += 1;

    if (gameState.humanScore === gameState.target || gameState.computerScore === gameState.target) {
      const winnerText = gameState.humanScore > gameState.computerScore ? 'You win the match!' : 'Computer wins the match!';
      finishGame(`${winnerText} (${choice} vs ${computerChoice})`);
      return;
    }

    updateStatus(`Round ${gameState.rounds}: ${choice} vs ${computerChoice}. Score ${gameState.humanScore}-${gameState.computerScore}.`);
  }

  function getRPSResult(human, computer) {
    if (human === computer) return 0;
    if ((human === 'rock' && computer === 'scissors') ||
        (human === 'paper' && computer === 'rock') ||
        (human === 'scissors' && computer === 'paper')) {
      return 1;
    }
    return -1;
  }
}

function initGuessTheNumber() {
  const secret = Math.ceil(Math.random() * 6);
  gameState = { remaining: 3, secret };
  renderBoard(3);
  updateStatus('Guess a number between 1 and 6.');

  [1, 2, 3, 4, 5, 6].forEach(number => {
    const button = createButton(number, () => makeGuess(number));
    gameBoard.appendChild(button);
  });

  function makeGuess(value) {
    if (!gameActive) return;
    gameState.remaining -= 1;

    if (value === gameState.secret) {
      finishGame(`Correct! The number was ${value}.`);
      return;
    }

    if (gameState.remaining === 0) {
      finishGame(`Out of guesses. The number was ${gameState.secret}.`);
      return;
    }

    updateStatus(`Wrong. ${value > gameState.secret ? 'Lower' : 'Higher'}. ${gameState.remaining} guesses left.`);
  }
}

function initMemoryMatch() {
  const values = shuffle([1, 1, 2, 2, 3, 3, 4, 4]);
  gameState = { values, revealed: [], matched: [] };
  renderBoard(4);
  updateStatus('Find all matching pairs.');

  values.forEach((value, index) => {
    const card = createButton('?', () => revealCard(index), 'memory-card');
    card.dataset.index = index.toString();
    gameBoard.appendChild(card);
  });

  function revealCard(index) {
    if (!gameActive || gameState.matched.includes(index) || gameState.revealed.includes(index)) return;
    gameState.revealed.push(index);
    updateCard(index);

    if (gameState.revealed.length < 2) return;

    const [first, second] = gameState.revealed;
    if (values[first] === values[second]) {
      gameState.matched.push(first, second);
      if (gameState.matched.length === values.length) {
        finishGame('All pairs found!');
        return;
      }
      updateStatus('Great! Keep matching.');
      gameState.revealed = [];
      return;
    }

    updateStatus('Not a pair. Try again.');
    gameActive = false;
    setTimeout(() => {
      gameState.revealed.forEach(i => updateCard(i, true));
      gameState.revealed = [];
      gameActive = true;
      updateStatus('Try again.');
    }, 800);
  }

  function updateCard(index, hide = false) {
    const card = gameBoard.querySelector(`button[data-index='${index}']`);
    if (!card) return;
    if (gameState.matched.includes(index) || (!hide && gameState.revealed.includes(index))) {
      card.textContent = values[index];
      card.disabled = gameState.matched.includes(index);
      card.style.background = gameState.matched.includes(index) ? 'var(--accent)' : 'rgba(56, 189, 248, 0.15)';
      card.style.color = '#0f172a';
    } else {
      card.textContent = '?';
      card.disabled = false;
      card.style.background = 'rgba(15, 23, 42, 0.85)';
      card.style.color = 'var(--text)';
    }
  }
}

function initSimonSays() {
  const colors = ['red', 'blue', 'green', 'yellow'];
  const sequence = Array.from({ length: 4 }, () => colors[Math.floor(Math.random() * colors.length)]);
  gameState = { sequence, position: 0, userTurn: false };
  renderBoard(2);
  updateStatus('Watch the sequence.');

  colors.forEach(color => {
    const button = createButton('', () => enterColor(color), 'simon-cell');
    button.style.background = color;
    button.dataset.color = color;
    gameBoard.appendChild(button);
  });

  function playSequence() {
    let index = 0;
    const interval = setInterval(() => {
      if (index >= sequence.length) {
        clearInterval(interval);
        gameState.userTurn = true;
        updateStatus('Repeat the sequence.');
        return;
      }
      const color = sequence[index];
      const button = Array.from(gameBoard.children).find(el => el.dataset.color === color);
      if (button) {
        button.style.borderColor = '#ffffff';
        setTimeout(() => button.style.borderColor = 'rgba(148, 163, 184, 0.18)', 300);
      }
      index += 1;
    }, 600);
  }

  function enterColor(color) {
    if (!gameActive || !gameState.userTurn) return;
    const expected = gameState.sequence[gameState.position];
    if (color !== expected) {
      finishGame('Wrong sequence.');
      return;
    }
    gameState.position += 1;
    if (gameState.position === gameState.sequence.length) {
      finishGame('Sequence complete!');
    } else {
      updateStatus(`Good. ${gameState.sequence.length - gameState.position} left.`);
    }
  }

  playSequence();
}

function initSpeedTap() {
  gameState = { round: 0, targetRounds: 5, timeoutId: null };
  renderBoard(3);
  updateStatus('Tap the highlighted square quickly.');

  const cells = Array.from({ length: 9 }, (_, index) => {
    const button = createButton('', () => tapSquare(index), 'speed-cell');
    button.dataset.index = index.toString();
    gameBoard.appendChild(button);
    return button;
  });

  function nextRound() {
    if (!gameActive) return;
    gameState.round += 1;
    if (gameState.round > gameState.targetRounds) {
      finishGame('Speed challenge complete!');
      return;
    }
    updateStatus(`Round ${gameState.round}: Tap the glowing square.`);
    const index = Math.floor(Math.random() * 9);
    cells.forEach(cell => {
      cell.style.background = 'rgba(15, 23, 42, 0.85)';
      cell.disabled = false;
      cell.dataset.target = 'false';
    });
    const target = cells[index];
    target.style.background = 'linear-gradient(135deg, #facc15, #fb7185)';
    target.dataset.target = 'true';
    gameState.timeoutId = window.setTimeout(() => {
      if (gameActive) {
        finishGame('Too slow!');
      }
    }, 1800);
  }

  function tapSquare(index) {
    if (!gameActive) return;
    const cell = gameBoard.querySelector(`button[data-index='${index}']`);
    if (cell.dataset.target === 'true') {
      cell.dataset.target = 'false';
      window.clearTimeout(gameState.timeoutId);
      nextRound();
      return;
    }
    finishGame('Wrong square.');
  }

  nextRound();
}

function initQuickMath() {
  const a = Math.ceil(Math.random() * 9);
  const b = Math.ceil(Math.random() * 9);
  const result = a + b;
  const options = shuffle([result, result + 1, result - 1]).map(value => Math.max(1, value));
  gameState = { result };
  renderBoard(3);
  updateStatus(`What is ${a} + ${b}?`);

  options.forEach(option => {
    const button = createButton(option, () => handleAnswer(option));
    gameBoard.appendChild(button);
  });

  function handleAnswer(value) {
    if (!gameActive) return;
    if (value === gameState.result) {
      finishGame('Correct!');
    } else {
      finishGame(`Wrong. The answer was ${gameState.result}.`);
    }
  }
}

function initLargerNumber() {
  const a = Math.ceil(Math.random() * 20);
  const b = Math.ceil(Math.random() * 20);
  gameState = { larger: Math.max(a, b) };
  renderBoard(2);
  updateStatus('Pick the larger number.');

  [a, b].forEach(value => {
    const button = createButton(value, () => chooseNumber(value));
    gameBoard.appendChild(button);
  });

  function chooseNumber(value) {
    if (!gameActive) return;
    if (value === gameState.larger) {
      finishGame('Correct choice!');
    } else {
      finishGame('Oops, that was smaller.');
    }
  }
}

function initOddColorOut() {
  const colors = ['#f97316', '#38bdf8', '#a855f7', '#22c55e'];
  const common = colors[Math.floor(Math.random() * colors.length)];
  const odd = colors.filter(color => color !== common)[Math.floor(Math.random() * (colors.length - 1))];
  const choices = shuffle([common, common, common, odd]);
  gameState = { odd };
  renderBoard(4);
  updateStatus('Pick the color that is different.');

  choices.forEach(color => {
    const button = createButton('', () => chooseColor(color), 'color-cell');
    button.style.background = color;
    gameBoard.appendChild(button);
  });

  function chooseColor(color) {
    if (!gameActive) return;
    if (color === gameState.odd) {
      finishGame('Nice! You found the odd color.');
    } else {
      finishGame('Not the odd color.');
    }
  }
}

function initPatternNext() {
  const patterns = [
    { items: [2, 4, 6], next: 8 },
    { items: [1, 3, 5], next: 7 },
    { items: [1, 2, 4], next: 8 },
    { items: [3, 6, 9], next: 12 },
  ];
  const pattern = patterns[Math.floor(Math.random() * patterns.length)];
  const options = shuffle([pattern.next, pattern.next + 1, pattern.next - 1]);
  gameState = { answer: pattern.next };
  renderBoard(3);
  updateStatus(`What comes next: ${pattern.items.join(', ')}?`);

  options.forEach(option => {
    const button = createButton(option, () => chooseOption(option));
    gameBoard.appendChild(button);
  });

  function chooseOption(value) {
    if (!gameActive) return;
    if (value === gameState.answer) {
      finishGame('Right answer!');
    } else {
      finishGame(`Wrong. It was ${gameState.answer}.`);
    }
  }
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

nextButton.addEventListener('click', goToNextGame);
restartButton.addEventListener('click', restartGame);
loadGame(0);
