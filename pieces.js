class Pieces {
  constructor(element, shape, type, speed, updateInterval) {
    this.element = element;
    this.shape = shape;
    this.isTypeGood = type;
    this.speed = speed;
    this.updateInterval = updateInterval;
  }
  randomX() {
    const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    const num = Math.random() * parent.innerWidth * 0.4 * plusOrMinus;
    this.element.style.left = num + 'px';
  }
  randomY() {
    const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    const num = Math.random() * parent.innerHeight * 0.4 * plusOrMinus;
    this.element.style.bottom = num + 'px';
  }

  startPiece() {
    this.element.innerText = this.shape;
    this.element.style.fontSize = Math.ceil(Math.random() * 50) + 5 + 'px';
    this.randomY();
    this.randomX();
    this.element.addEventListener('mouseover', () => this.onHitTarget());
  }

  movement() {
    if (this.isTypeGood) {
      console.log(this.speed);
    } else {
      console.log('speed');
    }
  }
  onHitTarget() {
    updateInterval(this.isTypeGood);
    if (this.isTypeGood) {
      this.randomY();
      this.randomX();
    }
  }
}
