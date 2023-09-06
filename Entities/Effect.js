class Effect {
    constructor(x, y, name, squareSize, number, game) {
        Object.assign(this, {x,y, name, squareSize, number, game});
        this.id = "effect";
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/" + this.name + "Effects.png");
        this.removeFromWorld = false;
        this.alpha = 1;
        this.width = this.squareSize;
        this.height = this.squareSize;
        this.fadeSpeed = 1.5;
    };

    update() {
        this.alpha -= this.fadeSpeed * this.game.clockTick;
        if (this.alpha <= 0) {
            this.removeFromWorld = true;
        }
    };

    draw(ctx) {
        if (!this.removeFromWorld) {
            ctx.globalAlpha = this.alpha;
            ctx.drawImage(this.spritesheet,
                0, this.height * this.number,
                this.width,this.height,
                this.x, this.y,
                this.width,this.height
                );
            ctx.globalAlpha = 1;
        }
    };
}