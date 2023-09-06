class Hisou extends Projectile {
    constructor(x, y, xVelocity, yVelocity, game) {
        super(x, y, 200, 200, 0, 128, 0, 0, 0, 0, null, "Tenshi",
            4, game);
        Object.assign(this, {xVelocity, yVelocity});
        this.radians = 0;
    };
    behavior() {
        if (this.y + this.hitboxY < 700) {
            this.yVelocity += 1500 * this.game.clockTick;
            this.radians -= 20 * this.game.clockTick;
        } else if (this.yVelocity > 0) {
            this.y = 700 - this.hitboxY;
            this.yVelocity = 0;
            this.xVelocity = 0;
            this.radians = 0;
            this.number = 5;
            ASSET_MANAGER.playSound("HisouStab");
        }
    };
    updateHitbox(){
        return null;
    };
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.radians);
        ctx.drawImage(this.spritesheet,
            0, this.height * this.number,
            this.width, this.height,
            -this.width / 2,  -this.height / 2, 
            this.width, this.height,
        );
        ctx.restore();
    };
}