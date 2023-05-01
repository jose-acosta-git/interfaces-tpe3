canvas.addEventListener('mousedown', (e) => {
    mouseDown = true;
    if (usingPencil) {
        brush = new Pencil(e.layerX - canvas.offsetLeft, e.layerY - canvas.offsetTop, color, context, size/baseWidth);
    } else {
        brush = new Eraser(e.layerX - canvas.offsetLeft, e.layerY - canvas.offsetTop, context, size/baseWidth);
    }
})

canvas.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        brush.moveTo(e.layerX - canvas.offsetLeft, e.layerY - canvas.offsetTop);
        brush.draw();
    }
})

canvas.addEventListener('mouseup', () => {
    mouseDown = false;
    brush = null;
})

colorInput.addEventListener('input', () => {
    color = colorInput.value;
})

sizeInput.addEventListener('change', () => {
    let s = sizeInput.value;
    if (s > 0) {
        size = s;
    } else {
        size = 1/baseWidth;
    }
})

pencilRadio.addEventListener('change' , () => {
    usingPencil = true;
})

eraserRadio.addEventListener('change' , () => {
    usingPencil = false;
})