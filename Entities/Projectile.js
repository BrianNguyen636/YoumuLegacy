class Projectile {
    constructor(x, y, width, height, speed, angle, lifespan, boss, number, game) {
        Object.assign(this, {x,y,width,height,speed,angle,lifespan,boss,number,game});
        this.id = "projectile"
        this.calculateVelocity();
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/MeilingProjectiles.png");

    };
    calculateVelocity() {
        this.radians = this.angle * Math.PI / 180;
        this.xVelocity = this.speed * Math.cos(this.radians);
        this.yVelocity = -this.speed * Math.sin(this.radians);
    };
    update() {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        if (this.lifespan == null) {
            if (this.x < 0 || this.x > 1280) {
                this.removeFromWorld = true;
            }
        } else {
            if (this.lifespan <= 0) {
                this.removeFromWorld = true;
            } else this.lifespan -= this.game.clockTick;
        }
    };

    draw(ctx) {
        if (!this.removeFromWorld) {
            ctx.drawImage(this.spritesheet,
                this.x, this.y + this.height * this.number,
                this.width, this.height,
                this.x, this.y, 
                this.width, this.height,
            );
        }
    };
}