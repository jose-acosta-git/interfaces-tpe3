/** @type {HTMLCanvasElement} */
//Elementos del HTML
const negative = document.getElementById('negative');
const binarization = document.getElementById('binarization');

negative.addEventListener('click', applyNegative);
binarization.addEventListener('click', applyBinarization);

function applyNegative() {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;
    for (let i=0; i < data.length; i+=4) {
        data[i] = 255 - data[i]; //rojo
        data[i + 1] = 255 - data[i + 1]; //verde
        data[i + 2] = 255 - data[i + 2]; //azul
    }
    context.putImageData(imageData, 0, 0);
}

function applyBinarization() {
}