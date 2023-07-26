class Effect {
    constructor(x, y, width, height, game) {
        this.id = "effect";
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width
        this.height = height;
        this.sprite = ASSET_MANAGER.getAsset("./assets/Stomp.png");
        this.removeFromWorld = false;
    };

    update() {
        this.updateBB();
        this.removeFromWorld = true;
    };

    draw(ctx) {
        if (!this.removeFromWorld)
        ctx.drawImage(this.sprite, this.x, this.y);
    };
}