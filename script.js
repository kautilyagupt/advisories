const gameScreen = document.getElementById('game-screen');
const scoreElement = document.getElementById('score');
const healthElement = document.getElementById('health');
const restartButton = document.getElementById('restart');

const PLAYER_SPEED = 4;
const JUMP_FORCE = 14;
const GRAVITY = 0.75;
const BULLET_SPEED = 12;
const ENEMY_SPEED = 2.8;
const ENEMY_BULLET_SPEED = 6;
const ENEMY_SPAWN_MIN = 900;
const ENEMY_SPAWN_MAX = 1600;

let gameState = {
  score: 0,
  health: 3,
  bullets: [],
  enemyBullets: [],
  enemies: [],
  keys: { left: false, right: false, jump: false, shoot: false },
  player: { x: 40, y: 0, vy: 0, width: 40, height: 40, canJump: true },
  lastShot: 0,
  gameActive: true,
};

let playerElement = null;
let groundY = 0;
let animationFrame = null;
let spawnTimeout = null;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function initGame() {
  gameState.score = 0;
  gameState.health = 3;
  gameState.bullets = [];
  gameState.enemies = [];
  gameState.keys = { left: false, right: false, jump: false, shoot: false };
  gameState.player = { x: 40, y: 0, vy: 0, width: 40, height: 40, canJump: true };
  gameState.lastSpawn = Date.now();
  gameState.lastShot = 0;
  gameState.gameActive = true;

  gameScreen.innerHTML = '';
  gameScreen.appendChild(createGround());
  playerElement = createPlayer();
  gameScreen.appendChild(playerElement);
  updateHUD();
  cancelAnimationFrame(animationFrame);
  if (spawnTimeout) {
    window.clearTimeout(spawnTimeout);
  }
  scheduleSpawn();
  animationFrame = window.requestAnimationFrame(gameLoop);
}

function createGround() {
  const ground = document.createElement('div');
  ground.className = 'ground';
  return ground;
}

function createPlayer() {
  const element = document.createElement('div');
  element.className = 'player';
  return element;
}

function createBullet(x, y) {
  const element = document.createElement('div');
  element.className = 'bullet';
  gameScreen.appendChild(element);
  gameState.bullets.push({ x, y, width: 16, height: 6, element });
}

function createEnemy() {
  const element = document.createElement('div');
  element.className = 'enemy';
  gameScreen.appendChild(element);
  gameState.enemies.push({ x: gameScreen.clientWidth + 40, y: groundY - 40, width: 36, height: 36, element, lastShot: Date.now() });
}

function createEnemyBullet(x, y) {
  const element = document.createElement('div');
  element.className = 'enemy-bullet';
  gameScreen.appendChild(element);
  gameState.enemyBullets.push({ x, y, width: 12, height: 6, element });
}

function updateHUD() {
  scoreElement.textContent = `${gameState.score}`;
  healthElement.textContent = `${gameState.health}`;
}

function scheduleSpawn() {
  if (!gameState.gameActive) return;
  const delay = ENEMY_SPAWN_MIN + Math.random() * (ENEMY_SPAWN_MAX - ENEMY_SPAWN_MIN);
  spawnTimeout = window.setTimeout(() => {
    if (!gameState.gameActive) return;
    createEnemy();
    scheduleSpawn();
  }, delay);
}

function gameLoop() {
  if (!gameState.gameActive) return;
  const screenWidth = gameScreen.clientWidth;
  const screenHeight = gameScreen.clientHeight;
  groundY = screenHeight - 58;

  const player = gameState.player;
  if (gameState.keys.left) player.x -= PLAYER_SPEED;
  if (gameState.keys.right) player.x += PLAYER_SPEED;

  if (gameState.keys.jump && player.canJump) {
    player.vy = -JUMP_FORCE;
    player.canJump = false;
  }

  player.vy += GRAVITY;
  player.y += player.vy;

  if (player.y >= groundY - player.height) {
    player.y = groundY - player.height;
    player.vy = 0;
    player.canJump = true;
  }

  player.x = clamp(player.x, 10, screenWidth - player.width - 10);
  playerElement.style.transform = `translate(${player.x}px, ${player.y}px)`;

  if (gameState.keys.shoot) {
    const now = Date.now();
    if (now - gameState.lastShot > 260) {
      gameState.lastShot = now;
      createBullet(player.x + player.width, player.y + player.height / 2 - 3);
    }
  }

  for (let i = gameState.bullets.length - 1; i >= 0; i--) {
    const bullet = gameState.bullets[i];
    bullet.x += BULLET_SPEED;
    bullet.element.style.transform = `translate(${bullet.x}px, ${bullet.y}px)`;
    if (bullet.x > screenWidth) {
      bullet.element.remove();
      gameState.bullets.splice(i, 1);
    }
  }

  for (let i = gameState.enemyBullets.length - 1; i >= 0; i--) {
    const bullet = gameState.enemyBullets[i];
    bullet.x -= ENEMY_BULLET_SPEED;
    bullet.element.style.transform = `translate(${bullet.x}px, ${bullet.y}px)`;

    if (bullet.x + bullet.width < 0) {
      bullet.element.remove();
      gameState.enemyBullets.splice(i, 1);
      continue;
    }

    if (rectsCollide(bullet, player)) {
      bullet.element.remove();
      gameState.enemyBullets.splice(i, 1);
      hitPlayer();
      continue;
    }
  }

  for (let i = gameState.enemies.length - 1; i >= 0; i--) {
    const enemy = gameState.enemies[i];
    enemy.x -= ENEMY_SPEED;
    enemy.element.style.transform = `translate(${enemy.x}px, ${enemy.y}px)`;

    if (enemy.x + enemy.width < 0) {
      enemy.element.remove();
      gameState.enemies.splice(i, 1);
      continue;
    }

    if (rectsCollide(player, enemy)) {
      enemy.element.remove();
      gameState.enemies.splice(i, 1);
      hitPlayer();
      continue;
    }

    if (Date.now() - enemy.lastShot > 950 && Math.random() < 0.18) {
      enemy.lastShot = Date.now();
      createEnemyBullet(enemy.x, enemy.y + enemy.height / 2 - 3);
    }

    for (let j = gameState.bullets.length - 1; j >= 0; j--) {
      const bullet = gameState.bullets[j];
      if (rectsCollide(bullet, enemy)) {
        bullet.element.remove();
        enemy.element.remove();
        gameState.bullets.splice(j, 1);
        gameState.enemies.splice(i, 1);
        gameState.score += 10;
        updateHUD();
        break;
      }
    }
  }

  if (gameState.gameActive) {
    animationFrame = window.requestAnimationFrame(gameLoop);
  }
}

function rectsCollide(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

function hitPlayer() {
  gameState.health -= 1;
  updateHUD();
  flashPlayer();
  if (gameState.health <= 0) {
    endGame();
  }
}

function flashPlayer() {
  if (!playerElement) return;
  playerElement.style.opacity = '0.4';
  setTimeout(() => {
    if (playerElement) playerElement.style.opacity = '1';
  }, 200);
}

function endGame() {
  gameState.gameActive = false;
  if (spawnTimeout) {
    window.clearTimeout(spawnTimeout);
  }
  cancelAnimationFrame(animationFrame);
  updateHUD();
  const overlay = document.createElement('div');
  overlay.className = 'game-over';
  overlay.innerHTML = `<div class="game-over-card"><h2>Game Over</h2><p>Score: ${gameState.score}</p><p>Press Restart to try again.</p></div>`;
  gameScreen.appendChild(overlay);
}

function handleKeyDown(event) {
  if (!gameState.gameActive) return;
  if (event.key === 'ArrowLeft') gameState.keys.left = true;
  if (event.key === 'ArrowRight') gameState.keys.right = true;
  if (event.key === 'x' || event.key === 'X') gameState.keys.jump = true;
  if (event.key === 'z' || event.key === 'Z') gameState.keys.shoot = true;
}

function handleKeyUp(event) {
  if (event.key === 'ArrowLeft') gameState.keys.left = false;
  if (event.key === 'ArrowRight') gameState.keys.right = false;
  if (event.key === 'x' || event.key === 'X') gameState.keys.jump = false;
  if (event.key === 'z' || event.key === 'Z') gameState.keys.shoot = false;
}

restartButton.addEventListener('click', () => {
  const gameOver = gameScreen.querySelector('.game-over');
  if (gameOver) gameOver.remove();
  initGame();
});

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

initGame();
