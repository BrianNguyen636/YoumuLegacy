class Klaxon extends Effect {
    constructor(yPos, duration, game) {
        super(0, 0, "Klaxon", 800, 0, game);
        Object.assign(this, {yPos, duration});
        this.xVelocity = 50;
        this.fadeSpeed = 1.5;
        this.cautionX = -300;
        this.symbolX = 0;
        this.soundTimer = 0;
        this.alpha = 0;
    };

    update() {
        console.log(this.alpha);
        this.cautionX += this.xVelocity * this.game.clockTick;
        this.symbolX -= this.xVelocity * this.game.clockTick;

        if (this.duration > 0) {
            this.duration -= this.game.clockTick;
            if (this.alpha < 1) {
                this.alpha += this.fadeSpeed * this.game.clockTick;
            } else {
                this.alpha = 1;
            }
        } else {
            this.alpha -= this.fadeSpeed * this.game.clockTick;
            if (this.alpha <= 0) {
                this.removeFromWorld = true;
            }
        }
        if (this.soundTimer <= 0) {
            ASSET_MANAGER.playSound("Caution");
            this.soundTimer = 1;
        }
        this.soundTimer -= this.game.clockTick;
    };

    draw(ctx) {
        if (!this.removeFromWorld) {
            ctx.globalAlpha = this.alpha;
            for (let i = 0; i < 3; i++) {
                ctx.drawImage(this.spritesheet, //CAUTION
                0, this.height * 0,
                this.width,this.height,
                this.cautionX + 512 * i, this.yPos,
                this.width,this.height
                );
            ctx.drawImage(this.spritesheet, //SYMBOL
                0, this.height * 1,
                this.width,this.height,
                this.symbolX + 512 * i, this.yPos + 67,
                this.width,this.height
                );
            ctx.drawImage(this.spritesheet, //CAUTION
                0, this.height * 0,
                this.width,this.height,
                this.cautionX + 512 * i, this.yPos + 67 + 256,
                this.width,this.height
                );
            }
            ctx.globalAlpha = 1;
        }
    };

}