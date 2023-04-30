class Brush {
    constructor(posX, posY, context, lineWidth) {
        this.previousX = posX;
        this.previousY = posY;
        this.posX = posX;
        this.posY = posY;
        this.context = context;
        this.context.lineWidth = lineWidth;
    }

    draw() {
        this.context.beginPath();
        this.context.strokeStyle = this.style;
        this.context.moveTo(this.previousX, this.previousY);
        this.context.lineTo(this.posX, this.posY);
        this.context.stroke();
        this.context.closePath();
    }

    moveTo(x, y) {
        this.previousX = this.posX;
        this.previousY = this.posY;
        this.posX = x;
        this.posY = y;
    }
}