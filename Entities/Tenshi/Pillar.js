class Pillar extends Projectile {
    constructor(x, lifespan, game) {
        super(x, 700 - 583, 200, 200, 
            3, 17, 130, 583, 0, 0, lifespan, "Tenshi", 1, game);
        this.bottom = this.y - 17 - 383;
    };

    behavior() {

    };

    draw(ctx) {
        if (!this.removeFromWorld) {
            ctx.drawImage(this.spritesheet,
                0, this.height * this.number,
                this.width, this.height * 3,
                this.x, this.y,
                this.width, this.height * 3,
            );
        }
    }
}