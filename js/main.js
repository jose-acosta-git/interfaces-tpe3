"use strict";
/** @type {HTMLCanvasElement} */

//Busca elementos del documento
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const colorInput = document.getElementById('colorInput')
const container = document.getElementById('canvasContainer');
const sizeInput = document.getElementById('sizeInput');
const pencilRadio = document.getElementById('pencil');
const eraserRadio = document.getElementById('eraser');

//Codigo para poder hacer el canvas responsive y evitar que se rompa cuando cambia su tamaño
canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;

window.addEventListener('resize', function() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
})

//Declaracion de variables del a app
let color = colorInput.value;
let size = sizeInput.value;
let usingPencil = pencilRadio.checked;
let mouseDown = false;
let brush = null;
const baseWidth = 25;

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