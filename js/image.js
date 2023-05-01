"use strict";

const btn = document.getElementById('bg-image');
const img = new Image();

btn.addEventListener('change', (e) => {
    if (e.target.files) {
        let file = e.target.files[0];
        
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = (e) => {
            img.src = e.target.result;
        }

        img.onload = () => {
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
    }
})