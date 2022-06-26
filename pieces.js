class Pieces {
  constructor(element, shape, type, speed, updateInterval) {
    this.element = element;
    this.shape = shape;
    this.isTypeGood = type;
    this.speed = speed;
    this.updateInterval = updateInterval;
  }
  randomX() {
    // const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    console.log(this.element.style.fontSize);
    const num = Math.random() * parent.innerWidth;
    this.element.style.left = num + 'px';
  }
  randomY() {
    // const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    const num = Math.random() * parent.innerHeight;
    this.element.style.top = num + 'px';
  }

  startPiece() {
    this.element.innerText = this.shape;
    const size = Math.ceil(Math.random() * 100) + 10;
    this.element.style.fontSize = size + 'px';
    this.element.style.height = size + 'px';
    this.element.style.width = size + 'px';
    this.randomY();
    this.randomX();
    this.element.addEventListener('mouseover', () => this.onHitTarget());
  }

  movement(cursorX, cursorY) {
    let directionFixY = this.isTypeGood ? this.speed * -1 : this.speed;
    let shapeFixY = parseInt(this.element.style.top.slice(0, -2));
    let gapY = cursorY - shapeFixY;
    if (gapY < 0) directionFixY = directionFixY * -1;
    let targetY = this.checkBoundary(shapeFixY + directionFixY, parent.innerHeight);
    this.element.style.top = targetY + 'px';

    let directionFixX = this.isTypeGood ? this.speed * -1 : this.speed;
    let shapeFixX = parseInt(this.element.style.left.slice(0, -2));
    let gapX = cursorX - shapeFixX;
    console.log('gapX', gapX);
    if (gapX < 0) directionFixX = directionFixX * -1;
    let targetX = this.checkBoundary(shapeFixX + directionFixX, parent.innerWidth);
    this.element.style.left = targetX + 'px';
  }
  onHitTarget() {
    updateInterval(this.isTypeGood);
    if (this.isTypeGood) {
      this.randomY();
      this.randomX();
    }
  }
  checkBoundary(num, max) {
    const shapeSize = parseInt(this.element.style.fontSize.slice(0, -2));
    if (num <= 0 + shapeSize / 2) return 0 + shapeSize / 2;
    if (num + this.speed + shapeSize / 2 >= max) return max - shapeSize;
    return num;
  }
}
