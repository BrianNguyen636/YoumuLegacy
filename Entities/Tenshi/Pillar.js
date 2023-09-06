class Pillar extends Projectile {
    constructor(x, lifespan, game) {
        super(x, 700, 200, 200, 
            3, 17, 130, 583, 0, 0, lifespan, "Tenshi", 1, game);
        this.bottom = this.y - 583;
        this.timer = 0;
        this.elevation = 0;
    };

    behavior() {
        if (this.timer == 0) {
            this.game.addEntity(new Effect(this.x - 12, this.y - 60, "Tenshi", 800, 3, this.game));
            this.timer = 0.7;
        } else if (this.timer < 0 && this.y > 700 - 583) {
            if (this.yVelocity == 0) ASSET_MANAGER.playSound("Pillar");
            this.yVelocity = -500000 * this.game.clockTick;
            this.elevation = (700 - this.y) / 583; 
        } else if (this.y <= 700 - 583) {
            this.y = 700 - 583;
            this.yVelocity = 0;
            this.elevation = 1;
        } else {
            this.timer -= this.game.clockTick;
        }
        if (this.lifespan <= 0) {
            this.game.addEntity(new Effect(this.x, this.y, "Tenshi", 800, 2, this.game));
        }
        if (!this.game.combat) {
            this.removeFromWorld = true;
            this.game.addEntity(new Effect(this.x, this.y, "Tenshi", 800, 2, this.game));
        }
    };

    draw(ctx) {
        if (!this.removeFromWorld) {
            ctx.drawImage(this.spritesheet,
                0, this.height * this.number,
                this.width, this.height * 3 * this.elevation,
                this.x, this.y,
                this.width, this.height * 3 * this.elevation,
            );
        }
    }
}