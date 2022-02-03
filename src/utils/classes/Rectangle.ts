export class Rectangle {
  constructor(public x: number, public y: number, public width: number, public height: number, public color?: string) {
    if (!this.color) {
      this.color = 'blue';
    }
  }
  draw(context: any) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);

    context.lineStyle = 'red';
  }
  changeColor(newColor: string) {
    this.color = newColor;
  }

  clickRectangle(xmouse: number, ymouse: number) {
    if (xmouse >= this.x && xmouse <= this.x + this.width && (ymouse >= this.y && ymouse <= this.y + this.height)) {
      return true;
    }
    return false;
  }
}
