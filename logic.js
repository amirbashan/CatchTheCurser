const gameBoard = document.getElementById('game');
const startButton = document.getElementById('start');
const score = document.getElementById('score');
let cursorX, cursorY, gameInterval, points, scoreCounter;

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



const init = () => {
  gameBoard.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  startButton.addEventListener('click', () => {
    points = 0;
    gameInterval = 0;
    scoreCounter = 0;
    startButton.style.display = 'none';
    chaser.startPiece();
    escaper.startPiece();
    blocker.startPiece();

    gameInterval = setInterval(() => {
      scoreCounter += 0.1;
      score.innerText = (scoreCounter + points).toFixed(0);
      chaser.movementByCursor(cursorX, cursorY);
      blocker.unrelatedMovement(cursorX, cursorY);
      escaper.movementByCursor(cursorX, cursorY);
    }, 100);

    gameBoard.addEventListener('mouseleave', () => {
      onCursorCollision(false);
    });
  });
};

init();
