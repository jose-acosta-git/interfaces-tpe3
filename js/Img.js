class Img {
    constructor(canvas, ctx, maxWidth, maxHeigth) {
        this.image = new Image();
        this.canvas = canvas;
        this.ctx = ctx;
        this.maxWidth = maxWidth;
        this.maxHeigth = maxHeigth;
    }

    drawImage(e) {
        //Si hay imagenes cargadas
        if (e.target.files) {
            //Utiliza una nueva instancia para que se reestablescan automaticamente las dimensiones
            let newImage = new Image();
            let file = e.target.files[0];
            
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = (e) => {
                newImage.src = e.target.result;
            }

            newImage.onload = () => {
                //Vacia el canvas
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.resize(newImage);
                //Reescala el canvas para no dejar espacios en blanco
                this.canvas.width = newImage.width;
                this.canvas.height = newImage.height;
                //Dibuja la imagen
                this.ctx.drawImage(newImage, 0, 0, newImage.width, newImage.height);
                //Guarda la instancia de la imagen
                this.image = newImage;
                //Reestablece los inputs de filtros
                this.resetFilters();
            }
        }
    }

    //Reescala la imagen si es mas grande de lo permitido
    resize(newImage) {
        if (newImage.width > this.maxWidth || newImage.height > this.maxHeigth) {
            //Obtiene la relacion de aspecto de la imagen
            let aspectRatio = newImage.width / newImage.height;

            if (newImage.width > this.maxWidth) {
                newImage.width = this.maxWidth;
                newImage.height = newImage.width / aspectRatio;
            }
            if (newImage.height > this.maxHeigth) {
                newImage.height = this.maxHeigth;
                newImage.width = newImage.height * aspectRatio;
            }
        }
    }

    //Resetea los inputs de brillo, saturacion y blur
    resetFilters() {
        brightness.value = defaultBrightness;
        saturation.value = defaultSaturation;
        blur.value = 0;
    }

    //Vacia el canvas. Si hay una imagen cargada la vuelve a dibujar
    reset() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.image) {
            this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
        }
        this.resetFilters();
    }

    //Vacia el canvas y elimina la instancia de imagen
    clean() {
        this.image = null;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.resetFilters();
    }

    //Descarga el canvas en forma de imagen
    save() {
        let link = document.createElement('a');
        link.download = 'canvas.png';
        link.href = this.canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        link.click();
    }

}