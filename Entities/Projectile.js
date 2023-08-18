class Projectile {
    constructor(x, y, width, height, 
        hitboxX, hitboxY, hitboxWidth, hitboxHeight, 
        speed, angle, lifespan, name, number, game) {
        Object.assign(this, {x,y,width,height,hitboxX, hitboxY, hitboxWidth, hitboxHeight, 
            speed,angle,lifespan,name,number,game});
        this.id = "projectile"
        this.calculateVelocity();
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/" + this.name + "Projectiles.png");
        this.updateHitbox();

    };
    calculateVelocity() {
        this.radians = this.angle * Math.PI / 180;
        this.xVelocity = this.speed * Math.cos(this.radians);
        this.yVelocity = -this.speed * Math.sin(this.radians);
    };
    updateHitbox(){
        this.game.addEntity(new Hitbox(this.x + this.hitboxX, this.y + this.hitboxY,
            this.hitboxWidth, this.hitboxHeight, 0, this.game));
    };
    update() {
        this.x += this.xVelocity * this.game.clockTick;
        this.y += this.yVelocity * this.game.clockTick;
        this.updateHitbox();
        this.behavior();
        if (this.lifespan != null) {
            if (this.lifespan <= 0) {
                this.removeFromWorld = true;
            } else this.lifespan -= this.game.clockTick;
        }
    };
    behavior() {
        if (this.x + this.width < 0 || this.x > 1280) {
            this.removeFromWorld = true;
        }
        if (this.y > 1600 || this.y < -800) {
            this.removeFromWorld = true;
        }
    };

    draw(ctx) {
        if (!this.removeFromWorld) {
            ctx.save();
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            ctx.rotate(-this.radians);
            ctx.drawImage(this.spritesheet,
                0, this.height * this.number,
                this.width, this.height,
                -this.width / 2, -this.height / 2, 
                this.width, this.height,
            );
            ctx.restore();
        }
    };
}