class Projectile {
    constructor(x, y, width, height, speed, angle, lifespan, boss, number, game) {
        this.id = "projectile"
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.speed = speed;
        this.calculateVelocity();
        this.lifespan = lifespan;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/"+ boss + "Projectiles.png");
        this.number = number;
    };
    calculateVelocity() {
        this.radians = this.angle * Math.PI / 180;
        this.xVelocity = speed * Math.cos(radians);
        this.yVelocity = -speed * Math.sin(radians);
    };
    update() {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        if (this.lifespan == 0) {
            this.removeFromWorld = true;
        } else this.lifespan -= this.game.clockTick;
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet,
            this.xStart, this.yStart + this.height * this.number,
            this.width, this.height,
            x, y, 
            this.width, this.height,
            );
    };
}