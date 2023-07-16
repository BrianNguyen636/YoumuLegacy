class hitbox {
    constructor(x, y, width, height, xVelocity, yVelocity, lifespan) {
        this.id = "attack";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.lifespan = lifespan;
        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x,this.y,this.width,this.height);
    };

    handleCollision(other) {
        other.hurt(this);
    }

    update() {
        this.x += xVelocity;
        this.y += yVelocity;
        this.updateBB();
    };

    draw() {

    };
}