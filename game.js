const gameBoard = document.getElementById('game');
const startButton = document.getElementById('start');
const score = document.getElementById('score');
let cursorX, cursorY, gameInterval, points;

const onCursorCollision = (isPieceGood) => {
  if (isPieceGood) {
    points = points + 5;
  } else {
    clearInterval(gameInterval);
    startButton.style.display = 'block';
    startButton.innerText = `Game Over!\nClick here to try again`;
  }
};
const getSpeed = () => Math.ceil(Math.random() * 50) + 50;

const chaser = new GamePiece(document.getElementById('chaser'), '🔴', false, getSpeed(), onCursorCollision);
const blocker = new GamePiece(document.getElementById('blocker'), '⚠️', false, getSpeed(), onCursorCollision);
const escaper = new GamePiece(document.getElementById('escaper'), '🟩', true, getSpeed(), onCursorCollision);

gameBoard.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

init = () => {
  startButton.addEventListener('click', () => {
    points = 0;
    gameInterval = 0;
    startButton.style.display = 'none';
    chaser.startPiece();
    escaper.startPiece();
    blocker.startPiece();

    let scoreCounter = 0;
    gameInterval = setInterval(() => {
      scoreCounter += 1;
      score.innerText = scoreCounter + points;
      chaser.movementCursor(cursorX, cursorY);
      blocker.movementRandom(cursorX, cursorY);
      escaper.movementCursor(cursorX, cursorY);
    }, 100);
  });
};

init();
