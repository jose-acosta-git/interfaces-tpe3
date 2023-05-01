/** @type {HTMLCanvasElement} */
"use strict";

const upload = document.getElementById('bg-image');
const reset = document.getElementById('reset');
const clean = document.getElementById('clean');
const save = document.getElementById('save');
const img = new Image();

upload.addEventListener('change', (e) => {
    if (e.target.files) {
        let file = e.target.files[0];
        
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = (e) => {
            img.src = e.target.result;
        }

        img.onload = () => {    
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
    }
})

reset.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (img.src) {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
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