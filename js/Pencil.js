class Pencil extends Brush{
    constructor(posX, posY, style, context, lineWidth) {
        super(posX, posY, context, lineWidth);
        this.style = style;
    }
}