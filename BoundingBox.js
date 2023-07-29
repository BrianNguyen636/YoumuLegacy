class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, {x,y,width,height});
        this.left = x;
        this.top = y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
        this.midX = this.left + this.width / 2;
        this.midY = (this.bottom - this.top) / 2;
    };
    collide(oth) {
        return (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top);
    };
};