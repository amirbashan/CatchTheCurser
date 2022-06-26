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
  }
};
const getSpeed = () => Math.ceil(Math.random() * 100);

gameBoard.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

const chaser = new Pieces(document.getElementById('chaser'), '🔴', false, getSpeed(), updateInterval);
const escaper = new Pieces(document.getElementById('escaper'), '🟩', true, getSpeed(), updateInterval);

start.addEventListener('click', () => {
  start.style.display = 'none';
  chaser.startPiece();
  escaper.startPiece();

  let scoreCounter = 0;
  interval = setInterval(() => {
    scoreCounter += 1;
    score.innerText = scoreCounter + points;
    chaser.movement(cursorX, cursorY);
    escaper.movement(cursorX, cursorY);
  }, 1000);
});
