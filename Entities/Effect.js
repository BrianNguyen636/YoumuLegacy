class Effect {
    constructor(x, y, name, number) {
        Object.assign(this, {x,y, name, number});
        this.id = "effect";
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/" + this.name + "Effects.png");
        this.removeFromWorld = false;
        this.alpha = 1;
        this.width = 800;
        this.height = 800;
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