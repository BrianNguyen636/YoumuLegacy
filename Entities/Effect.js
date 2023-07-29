class Effect {
    constructor(x, y) {
        Object.assign(this, {x,y});
        this.id = "effect";
        this.sprite = ASSET_MANAGER.getAsset("./assets/Stomp.png");
        this.removeFromWorld = false;
        this.alpha = 1;
    };

    update() {
        this.alpha -= 0.02;
        if (this.alpha <= 0) {
            this.removeFromWorld = true;
        } 
    };

    draw(ctx) {
        if (!this.removeFromWorld) {
            ctx.globalAlpha = this.alpha;
            ctx.drawImage(this.sprite, this.x, this.y);
            ctx.globalAlpha = 1;
        }
    };
}