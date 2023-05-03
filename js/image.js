/** @type {HTMLCanvasElement} */
"use strict";

const upload = document.getElementById('bg-image');
const reset = document.getElementById('reset');
const clean = document.getElementById('clean');
const save = document.getElementById('save');
let image = null;

const maxWidth = 800;
const maxHeigth = 600;

upload.addEventListener('change', (e) => {
    if (e.target.files) {
        let img = new Image();
        let file = e.target.files[0];
        
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = (e) => {
            img.src = e.target.result;
        }

        img.onload = () => {
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
            
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);
            image = img;
        }
    }
})

reset.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (image) {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
})

clean.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
})

save.addEventListener('click', () => {
    let link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    link.click();
})