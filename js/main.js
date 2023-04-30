"use strict";
/** @type {HTMLCanvasElement} */

//Busca elementos del documento
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const colorInput = document.getElementById('colorInput')
const container = document.getElementById('canvasContainer');
const sizeInput = document.getElementById('sizeInput');

//Codigo para poder hacer el canvas responsive y evitar que se rompa cuando cambia su tamaño
canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;

window.addEventListener('resize', function() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
})

//Declaracion de variables del a app
let mouseDown = false;
let color = colorInput.value;
let size = sizeInput.value;
let pencil = null;
const baseWidth = 35;

canvas.addEventListener('mousedown', (e) => {
    mouseDown = true;
    pencil = new Pencil(e.layerX - canvas.offsetLeft, e.layerY - canvas.offsetTop, color, context, size/baseWidth);
})

canvas.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        pencil.moveTo(e.layerX - canvas.offsetLeft, e.layerY - canvas.offsetTop);
        pencil.draw();
    }
})

canvas.addEventListener('mouseup', (e) => {
    mouseDown = false;
    pencil = null;
})

colorInput.addEventListener('input', () => {
    color = colorInput.value;
})

sizeInput.addEventListener('change', () => {
    let s = sizeInput.value;
    console.log(s);
    if (s > 0) {
        size = s;
    } else {
        size = 1/baseWidth;
    }
})