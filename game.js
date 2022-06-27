const gameBoard = document.getElementById('game');
const start = document.getElementById('start');
const score = document.getElementById('score');
let cursorX, cursorY;
let interval = 0;
let points = 0;

const updateInterval = (bool) => {
  if (bool) {
    points = points + 5;
  } else {
    clearInterval(interval);
    start.style.display = 'block';
    start.innerText = `Game Over!\nClick here to try again`;
  }
};
const getSpeed = () => Math.ceil(Math.random() * 100);

const chaser = new Pieces(document.getElementById('chaser'), '🔴', false, getSpeed(), updateInterval);
const blocker = new Pieces(document.getElementById('blocker'), '⚠️', false, getSpeed(), updateInterval);
const escaper = new Pieces(document.getElementById('escaper'), '🟩', true, getSpeed(), updateInterval);

gameBoard.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

start.addEventListener('click', () => {
  start.style.display = 'none';
  chaser.startPiece();
  escaper.startPiece();
  blocker.startPiece();

  let scoreCounter = 0;
  interval = setInterval(() => {
    scoreCounter += 1;
    score.innerText = scoreCounter + points;
    chaser.movementCursor(cursorX, cursorY);
    blocker.movementCursor(cursorX, cursorY);
    escaper.movementCursor(cursorX, cursorY);
  }, 1000);
});
