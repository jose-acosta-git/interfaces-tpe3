/** @type {HTMLCanvasElement} */

//Elementos del HTML
const negative = document.getElementById('negative');
const binarization = document.getElementById('binarization');
const sepia = document.getElementById('sepia');
const saturation = document.getElementById('saturation');
const brightness = document.getElementById('brightness');

//Establece los valores por defecto de brillo y saturacion
const defaultBrightness = brightness.value;
const defaultSaturation = saturation.value;

//Escucha eventos de los botones y los input de tipo radio
negative.addEventListener('click', (e) => {
    e.preventDefault();
    applyFilter('negative');
});
binarization.addEventListener('click', (e) => {
    e.preventDefault();
    applyFilter('binarization');
});
sepia.addEventListener('click', (e) => {
    e.preventDefault();
    applyFilter('sepia');
});
brightness.addEventListener('change', () => {
    //Restaura la imagen a su estado original
    reset.click();

    //Calcula la intensidad del brillo
    let change = 2 * ( brightness.value - defaultBrightness);
    applyFilter('bright', change);
});
saturation.addEventListener('change', () => {
    //Restaura la imagen a su estado original
    reset.click();

    // Calcula la intensidad de la saturación
    let change = 0.25 * (saturation.value - defaultSaturation);
    applyFilter('saturation', change);
});

function applyFilter(filter, change = null) {
    //Obtiene los pixeles actualizados del canvas
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    //Recorre los pixeles del canvas de 4 en 4 (el RGBA de cada pixel, ya que se guarda en un array de 1 dimension)
    for (let i=0; i < data.length; i+=4) {
        //Guarda el valor rojo, verde y azul de cada pixel
        let red = data[i];
        let green = data[i+1];
        let blue = data[i+2];

        //Aplica el filtro correspondiente de acuerdo al boton clickeado
        switch (filter) {
            case 'negative': applyNegative(data, red, green, blue, i);
                break;
            case 'binarization': applyBinarization(data, red, green, blue, i);
                break;
            case 'bright': changeBrightness(data, red, green, blue, i, change);
                break;
            case 'saturation': changeSaturation(data, red, green, blue, i, change);
                break;
            default: applySepia(data, red, green, blue, i);
                break;
        }

    }
    //Actualiza el imageData del canvas
    context.putImageData(imageData, 0, 0);
}

//Aplica el filtro negativo al canvas, que consiste en invertir los componentes de cada pixel
function applyNegative(data, red, green, blue, i) {
    //Invierte el valor del rojo, verde y azul del pixel
    data[i] = 255 - red; //rojo
    data[i + 1] = 255 - green; //verde
    data[i + 2] = 255 - blue; //azul
}

//Aplica el filtro de binarizacion al canvas, que consiste en convertir cada pixel en blanco o negro de acuerdo al promedio de sus componentes
function applyBinarization(data, red, green, blue, i) {
    //Guarda el valor rojo, verde y azul de cada pixel
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

//Filtro que modifica la imagen logrando un tono marron (aumentando el tono cálido y disminuyendo el tono frío)
function applySepia(data, red, green, blue, i) {
    //Modifica los componentes del pixel para lograr el efecto sepia
    data[i] = Math.min(0.393 * red + 0.769 * green + 0.189 * blue, 255);
    data[i + 1] = Math.min(0.349 * red + 0.686 * green + 0.168 * blue, 255);
    data[i + 2] = Math.min(0.272 * red + 0.534 * green + 0.131 * blue, 255);
}

//Cambia el brillo del canvas
function changeBrightness(data, red, green, blue, i, change) {
    //Aumenta o disminuye el valor de cada componente del pixel para cambiar el brillo
    data[i] += change;
    data[i+1] += change;
    data[i+2] += change;
}

function changeSaturation(data, red, green, blue, i, change) {
    // Calcula la luminosidad del pixel
    let lum = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

    // Establece los nuevos valores de los componentes rojo, verde y azul
    data[i] = lum + change * (red - lum);
    data[i+1] = lum + change * (green - lum);
    data[i+2] = lum + change * (blue - lum);
}