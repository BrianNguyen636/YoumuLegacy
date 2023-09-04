class Snowflake extends Projectile {
    constructor(x, y, facing, timer, boss) {
        super(x, y, 200, 200, 
            -80, -80, 360, 360, 0, 0, null, "Cirno", 2, boss.game);
        this.facing = facing;

        this.timer = timer;

        this.radians = 0;
        this.alpha = 1;
        this.upscale = 10;
    }
    behavior() {
        this.radians -= (1 - this.facing * 2) * 2.5 * this.game.clockTick;
        this.timer -= this.game.clockTick;
        if (this.timer <= 0) {
            this.alpha -= this.game.clockTick * 2;
            this.hitboxWidth = 0;
            this.hitboxHeight = 0;
        }
        if (this.alpha <= 0) {
            this.removeFromWorld = true;
        }
    }
    draw(ctx) {
        if (!this.removeFromWorld) {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            ctx.rotate(-this.radians);
            ctx.drawImage(this.spritesheet,
                0, this.height * this.number,
                this.width, this.height,
                -this.width / 2 * this.upscale, -this.height / 2 * this.upscale, 
                this.width * this.upscale, this.height * this.upscale,
            );
            ctx.restore();
        }
    };
}