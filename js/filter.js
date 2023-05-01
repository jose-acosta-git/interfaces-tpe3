/** @type {HTMLCanvasElement} */
//Elementos del HTML
const negative = document.getElementById('negative');
const binarization = document.getElementById('binarization');

negative.addEventListener('click', applyNegative);
binarization.addEventListener('click', applyBinarization);

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