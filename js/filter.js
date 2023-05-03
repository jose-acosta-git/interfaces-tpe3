/** @type {HTMLCanvasElement} */
//Elementos del HTML
const negative = document.getElementById('negative');
const binarization = document.getElementById('binarization');
const sepia = document.getElementById('sepia');

negative.addEventListener('click', applyNegative);
binarization.addEventListener('click', applyBinarization);
sepia.addEventListener('click', applySepia);

function applyNegative() {
    //Obtiene los pixeles actualizados del canvas
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;
    //Recorre los pixeles del canvas de 4 en 4 (el rgba de cada pixel, ya que se guarda en un array de 1 dimension)
    for (let i=0; i < data.length; i+=4) {
        //Invierte el valor del rojo, verde y azul del pixel
        data[i] = 255 - data[i]; //rojo
        data[i + 1] = 255 - data[i + 1]; //verde
        data[i + 2] = 255 - data[i + 2]; //azul
    }
    //Actualiza el imageData del canvas
    context.putImageData(imageData, 0, 0);
}

function applyBinarization() {
    //Obtiene los pixeles actualizados del canvas
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;
    //Recorre los pixeles del canvas de 4 en 4 (el rgba de cada pixel, ya que se guarda en un array de 1 dimension)
    for (let i=0; i < data.length; i+=4) {
        //Guarda el valor rojo, verde y azul de cada pixel
        let red = data[i];
        let green = data[i+1];
        let blue = data[i+2];
        let newColor;
        //Calcula el promedio de los 3 colores
        let brightness = (red + green + blue) / 3;
        //Si el promedio da menos de 128 se establece el pixel en negro, si da 128 o mas se establece en blanco
        if (brightness < 128) {
            newColor = 0;
        } else {
            newColor = 255;
        }
        //Reescribe los valores rojo, verde y azul del pixel
        data[i] = newColor;
        data[i+1] = newColor;
        data[i+2] = newColor;
    }
    //Actualiza el imageData del canvas
    context.putImageData(imageData, 0, 0);
}

//Filtro que modifica la imagen logrando un tono marron (aumentando el tono cálido y disminuyendo el tono frío)
function applySepia() {
    //Obtiene los pixeles actualizados del canvas
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;
    //Recorre los pixeles del canvas de 4 en 4 (el rgba de cada pixel, ya que se guarda en un array de 1 dimension)
    for (let i=0; i < data.length; i+=4) {
        //Guarda el valor rojo, verde y azul de cada pixel
        let red = data[i];
        let green = data[i+1];
        let blue = data[i+2];

        data[i] = Math.min(0.393 * red + 0.769 * green + 0.189 * blue, 255);
        data[i + 1] = Math.min(0.349 * red + 0.686 * green + 0.168 * blue, 255);
        data[i + 2] = Math.min(0.272 * red + 0.534 * green + 0.131 * blue, 255);

    }
    //Actualiza el imageData del canvas
    context.putImageData(imageData, 0, 0);
}