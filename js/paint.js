//Obtiene elementos del HTML
const colorInput = document.getElementById('colorInput')
const sizeInput = document.getElementById('sizeInput');
const pencilRadio = document.getElementById('pencil');
const eraserRadio = document.getElementById('eraser');

//Declara variables necesarias para el funcionamiento del paint
let color = colorInput.value;
let size = sizeInput.value;
let usingPencil = pencilRadio.checked;
let mouseDown = false;
let brush = null;
const baseWidth = 25;

//Crea una instancia de lapiz o goma segun corresponda
canvas.addEventListener('mousedown', (e) => {
    mouseDown = true;
    if (usingPencil) {
        brush = new Pencil(e.layerX - canvas.offsetLeft, e.layerY - canvas.offsetTop, color, context, size/baseWidth);
    } else {
        brush = new Eraser(e.layerX - canvas.offsetLeft, e.layerY - canvas.offsetTop, context, size/baseWidth);
    }
})

//Dibuja o borra en el lienzo
canvas.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        brush.moveTo(e.layerX - canvas.offsetLeft, e.layerY - canvas.offsetTop);
        brush.draw();
    }
})

//Deja de dibujar, eliminando la instancia del pincel
canvas.addEventListener('mouseup', () => {
    mouseDown = false;
    brush = null;
})

//Cambia el color
colorInput.addEventListener('input', () => {
    color = colorInput.value;
})

//Cambia el tamaño del pincel
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