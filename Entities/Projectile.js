class Projectile {
    constructor(x, y, width, height, speed, angle, lifespan, boss, number, game) {
        Object.assign(this, {x,y,width,height,speed,angle,lifespan,boss,number,game});
        this.id = "projectile"
        this.calculateVelocity();
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/" + this.boss + "Projectiles.png");
        this.updateHitbox();

    };
    calculateVelocity() {
        this.radians = this.angle * Math.PI / 180;
        this.xVelocity = this.speed * Math.cos(this.radians);
        this.yVelocity = -this.speed * Math.sin(this.radians);
    };
    updateHitbox(){
        this.game.addEntity(new Hitbox(this.x,this.y,this.width,this.height,0,this.game));
    };
    update() {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        this.updateHitbox();
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