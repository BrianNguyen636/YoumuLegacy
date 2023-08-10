class Hitbox {
    constructor(x, y, width, height, lifespan, game) {
        Object.assign(this, {x,y,width,height,lifespan,game});
        this.id = "attack";
        this.removeFromWorld = false;
        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x,this.y,this.width,this.height);
    };

    update() {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        this.updateBB();
        if (this.lifespan <= 0) {
            this.removeFromWorld = true;
        } else this.lifespan -= this.game.clockTick;
    };

    draw(ctx) {
        // ctx.strokeStyle = "red";
        // ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };
}
