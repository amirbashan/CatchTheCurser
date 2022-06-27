class Pieces {
  constructor(element, shape, type, speed, updateInterval) {
    this.element = element;
    this.shape = shape;
    this.isTypeGood = type;
    this.speed = speed;
    this.updateInterval = updateInterval;
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

  movementCursor(cursorX, cursorY) {
    this.moveByAxis('X', cursorX);
    this.moveByAxis('Y', cursorY);
  }

  moveByAxis(axis, cursor) {
    let towardsOrAway = this.isTypeGood ? this.speed * -1 : this.speed;
    const orientation = axis === 'Y' ? 'top' : 'left';
    const direction = axis === 'Y' ? 'innerHeight' : 'innerWidth';
    const shapeLocation = parseInt(this.element.style[orientation].slice(0, -2));
    const gap = cursor - shapeLocation;
    if (gap < 0) towardsOrAway = towardsOrAway * -1;
    if (Math.abs(gap) < this.speed) towardsOrAway = gap;
    const target = this.checkBoundary(shapeLocation + towardsOrAway, parent[direction]);
    this.element.style[orientation] = target + 'px';
  }

  movementRandom() {}

  onHitTarget() {
    updateInterval(this.isTypeGood);
    if (this.isTypeGood) {
      this.randomY();
      this.randomX();
    }
  }

  randomX() {
    const randomNum = Math.random() * parent.innerWidth;
    this.element.style.left = this.checkBoundary(randomNum, parent.innerWidth) + 'px';
  }
  randomY() {
    const randomNum = Math.random() * parent.innerHeight;
    this.element.style.top = this.checkBoundary(randomNum, parent.innerHeight) + 'px';
  }

  checkBoundary(num, max) {
    const shapeSize = parseInt(this.element.style.fontSize.slice(0, -2));
    if (num <= 0 + shapeSize / 2) return 0 + shapeSize / 2;
    if (num >= max - shapeSize) return max - shapeSize;
    return num;
  }
}
