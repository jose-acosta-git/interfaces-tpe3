class Pencil {
    constructor(posX, posY, fill, context, lineWidth) {
        this.previousX = posX;
        this.previousY = posY;
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
        this.context.lineWidth = lineWidth;
    }

    draw() {
        this.context.beginPath();
        this.context.fillStyle = this.fill;
        this.context.strokeStyle = this.fill;
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