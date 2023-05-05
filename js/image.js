/** @type {HTMLCanvasElement} */
"use strict";

//Elementos del HTML

const uploadBtn = document.getElementById('uploadBtn');
const uploadInput = document.getElementById('uploadInput');
const reset = document.getElementById('reset');
const clean = document.getElementById('clean');
const save = document.getElementById('save');

//Declara variables necesarias para el funcionamiento de las imagenes

let image = null;
const maxWidth = 1000;
const maxHeigth = 600;

/*Event listeners de los botones*/

uploadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    uploadInput.click();
})

//Dibuja la imagen cargada en el canvas
uploadInput.addEventListener('change', (e) => {
    //Si hay imagenes cargadas
    if (e.target.files) {
        //Utiliza una nueva instancia para que se reestablescan automaticamente las dimensiones
        let img = new Image();
        let file = e.target.files[0];
        
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = (e) => {
            img.src = e.target.result;
        }

        img.onload = () => {
            //Vacia el canvas
            context.clearRect(0, 0, canvas.width, canvas.height);
            
            //Reescala la imagen si es mas grande de lo permitido
            if (img.width > maxWidth || img.height > maxHeigth) {
                //Obtiene la relacion de aspecto de la imagen
                let aspectRatio = img.width / img.height;

                if (img.width > maxWidth) {
                    img.width = maxWidth;
                    img.height = img.width / aspectRatio;
                }
                if (img.height > maxHeigth) {
                    img.height = maxHeigth;
                    img.width = img.height * aspectRatio;
                }
            }
            //Reescala el canvas para no dejar espacios en blanco
            canvas.width = img.width;
            canvas.height = img.height;
            //Dibuja la imagen
            context.drawImage(img, 0, 0, img.width, img.height);
            //Guarda la instancia de la imagen
            image = img;
        }
    }
})

//Vacia el canvas. Si hay una imagen cargada la vuelve a dibujar
reset.addEventListener('click', (e) => {
    e.preventDefault();
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (image) {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
})

//Vacia el canvas y elimina la instancia de imagen
clean.addEventListener('click', (e) => {
    e.preventDefault();
    image = null;
    context.clearRect(0, 0, canvas.width, canvas.height);
})

//Descarga el canvas en forma de imagen
save.addEventListener('click', (e) => {
    e.preventDefault();
    let link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    link.click();
})