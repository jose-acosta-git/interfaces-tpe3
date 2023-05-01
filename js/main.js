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

container.addEventListener('resize', function() {
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