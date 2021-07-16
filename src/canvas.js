class Canvas {
    constructor(canvas, width, height) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
    }

    fillRect(x, y, width, height) {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(x, this.height-y-height, width, height)
    }

    clear() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
}

export default Canvas