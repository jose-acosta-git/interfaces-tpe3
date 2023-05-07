"use strict";
/** @type {HTMLCanvasElement} */

//Obtiene el canvas y su contexto
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');


                        /* BOTONES Y FUNCIONALIDADES DEL MANEJO DE LAS IMAGENES */

//Elementos del HTML para el manejo de las imagenes

const uploadBtn = document.getElementById('uploadBtn');
const uploadInput = document.getElementById('uploadInput');
const reset = document.getElementById('reset');
const clean = document.getElementById('clean');
const save = document.getElementById('save');

//Crea la imagen y establece un ancho y alto maximo
const img = new Img(canvas, context, 1000, 600);

/* EVENT LISTENERS QUE CORRESPONDEN AL MANEJO DE LA IMAGEN */

uploadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    uploadInput.click();
})

//Dibuja la imagen cargada en el canvas
uploadInput.addEventListener('change', (e) => {
    img.drawImage(e);
})

//Vacia el canvas. Si hay una imagen cargada la vuelve a dibujar
reset.addEventListener('click', (e) => {
    e.preventDefault();
    img.reset();
})

//Vacia el canvas y elimina la instancia de imagen
clean.addEventListener('click', (e) => {
    e.preventDefault();
    img.clean();
})

//Descarga el canvas en forma de imagen
save.addEventListener('click', (e) => {
    e.preventDefault();
    img.save();
})



                        /* BOTONES Y FUNCIONALIDADES DEL MANEJO DE LOS FILTROS */

//Elementos del HTML
const negative = document.getElementById('negative');
const binarization = document.getElementById('binarization');
const sepia = document.getElementById('sepia');
const saturation = document.getElementById('saturation');
const blur = document.getElementById('blur');
const brightness = document.getElementById('brightness');

//Establece los valores por defecto de brillo y saturacion
const defaultBrightness = brightness.value;
const defaultSaturation = saturation.value;

//Escucha eventos de los botones y los input de tipo radio
negative.addEventListener('click', (e) => {
    e.preventDefault();
    img.applyFilter('negative');
});
binarization.addEventListener('click', (e) => {
    e.preventDefault();
    img.applyFilter('binarization');
});
sepia.addEventListener('click', (e) => {
    e.preventDefault();
    img.applyFilter('sepia');
});
brightness.addEventListener('change', () => {
    //Calcula la intensidad del brillo
    let change = 5 * ( brightness.value - defaultBrightness );
    img.applyFilter('bright', change);
});
saturation.addEventListener('change', () => {
    // Calcula la intensidad de la saturación
    let change = saturation.value - defaultSaturation ;
    img.applyFilter('saturation', change);
});
blur.addEventListener('change', () => { img.applyBlur() });