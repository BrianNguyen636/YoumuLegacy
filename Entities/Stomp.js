class Stomp {
    constructor(x, y, game) {
        this.id = "attack";
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 510;
        this.updateBB();
        this.sprite = ASSET_MANAGER.getAsset("./assets/Stomp.png");
        this.removeFromWorld = false;
    };

    updateBB() {
        this.BB = new BoundingBox(this.x + 53, this.y,this.width,this.height);
    };

    handleCollision(other) {
        other.hurt(this);
    }

    update() {
        this.updateBB();
        this.removeFromWorld = true;
    };

    draw(ctx) {
        if (!this.removeFromWorld)
        ctx.drawImage(this.sprite, this.x, this.y);
    };
}