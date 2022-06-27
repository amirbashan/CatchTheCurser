class GamePiece {
  constructor(element, shape, type, speed, onCursorCollision) {
    this.element = element;
    this.shape = shape;
    this.isTypeGood = type;
    this.speed = speed;
    this.onCursorCollision = onCursorCollision;
    this.randomVector = {
      X: Math.random() > 0.5 ? 1 : (-1 * Math.floor(Math.random() * 100)) / 100,
      Y: Math.random() > 0.5 ? 1 : (-1 * Math.floor(Math.random() * 100)) / 100
    };
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
    const shapeLocation = parseInt(this.element.style[orientation].slice(0, -2));
    const gap = cursor - shapeLocation;
    if (gap < 0) towardsOrAway = towardsOrAway * -1;
    if (Math.abs(gap) < this.speed) towardsOrAway = gap;
    const heightOrWidth = axis === 'Y' ? 'innerHeight' : 'innerWidth';
    const target = this.checkBoundary(shapeLocation + towardsOrAway, parent[heightOrWidth]);
    this.element.style[orientation] = target + 'px';
  }
  movementRandom(axis) {
    this.movementRandomByAxis('X');
    this.movementRandomByAxis('Y');
  }

  movementRandomByAxis(axis) {
    const orientation = axis === 'Y' ? 'top' : 'left';
    const shapeLocation = parseInt(this.element.style[orientation].slice(0, -2));
    const move = this.speed * this.randomVector[axis];
    const heightOrWidth = axis === 'Y' ? 'innerHeight' : 'innerWidth';
    const target = this.checkBoundary(shapeLocation + move, parent[heightOrWidth]);


    
    this.element.style[orientation] = target + 'px';
    const shapeSize = parseInt(this.element.style.fontSize.slice(0, -2));
    if (target == shapeSize / 2 || target == parent[heightOrWidth] - shapeSize) {
      this.randomVector[axis] = Math.random() > 0.5 ? 1 : (-1 * Math.floor(Math.random() * 100)) / 100;
      console.log(this.randomVector[axis]);
    }
  }

  onHitTarget() {
    this.onCursorCollision(this.isTypeGood);
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
    if (num <= shapeSize / 2) return shapeSize / 2;
    if (num >= max - shapeSize) return max - shapeSize;
    return num;
  }
}
