class Lob extends Projectile {
    constructor(x, y, launchTime, offset, boss) {
        super(x, y, 200, 200, 
            35, 35, 130, 130, 0, 0, null, "Cirno", 1, boss.game);
        Object.assign(this, {boss, launchTime, offset});
        this.scale = 0;
        this.timer = 0;
        this.shot = false;
        this.airTime = 1.5;
        this.radians = 0;
    };

    updateHitbox(){
        this.game.addEntity(new Hitbox(this.x + this.hitboxX + 65 * (1-this.scale), this.y + this.hitboxY + 65 * (1-this.scale),
            this.hitboxWidth * this.scale, this.hitboxHeight * this.scale, 0, this.game));
    };

    behavior() {
        if (this.scale < 1) {
            this.scale += this.game.clockTick * 1.5;
        } else this.scale = 1;
        if (!this.game.combat) this.removeFromWorld = true;
        if (this.y > 1600 || this.y < -800) {
            this.removeFromWorld = true;
        }

        if (this.launchTime > 0) this.launchTime -= this.game.clockTick;
        else {
            this.timer += this.game.clockTick;
            
            if (!this.shot) {
                this.yVelocity -= 900;
                let xDiff = this.game.player.BB.midX - (this.x + 100) + this.offset;
                this.xVelocity = xDiff / this.airTime;
                this.shot = true;

                if (xDiff > 0) this.facing = 1;
                else this.facing = -1;
            }
            this.radians += this.facing * 2.5 * this.game.clockTick;
            this.yVelocity += 1200 * this.game.clockTick;
        }
    };
    draw(ctx) {
        if (!this.removeFromWorld) {
            if (this.launchTime > 0) {
                ctx.drawImage(this.spritesheet,
                    0, this.height * this.number,
                    this.width, this.height,
                    this.x + 100 * (1-this.scale), this.y + 100 * (1-this.scale), 
                    this.width * this.scale, this.height * this.scale);
            } else {
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
            }
        }
    }
}