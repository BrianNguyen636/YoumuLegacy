class Yuyuko {
    constructor(game) {
        this.id = "npc";
        this.game = game;
        this.x = 800;
        this.y = 700 - 157 * 1.5;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/YuyukoSpritesheet.png");
        this.animator = new Animator(this.spritesheet, 0, 0, 200, 200, 10, 10); 
        this.timer = 0;
        this.yVelocity = 0;
        this.updateBB();
    };
    updateBB() {
        this.BB = new BoundingBox(this.x + 50 * 1.5, this.y + 155 * 1.5, 97 * 1.5, 2 * 1.5);
    };
    update() {
        if (this.game.roomManager.stage != 0) this.removeFromWorld = true;
        this.y += this.yVelocity;
        if (this.timer <= 0.5 * this.animator.totalTime) {
            if (this.yVelocity < 0) this.yVelocity = 0;
            this.yVelocity += 0.4 * this.game.clockTick;
        } else if (this.timer > 0.5 * this.animator.totalTime && this.timer < this.animator.totalTime) {
            if (this.yVelocity > 0) this.yVelocity = 0;
            this.yVelocity -= 0.4 * this.game.clockTick;
        } else this.timer = 0;
        this.timer += this.game.clockTick;
    }
    drawShadow(ctx) {
        let distance = 700 - this.BB.bottom;
        let scale = 1 - distance / 700;
        if (scale < 0) scale = 0;
        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = "black";
        ctx.ellipse(this.BB.midX + 9, 700, 70 * scale, 12 * scale, 0, 0, 2 * Math.PI);
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.restore();
    }


    draw(ctx) {
        this.drawShadow(ctx);
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        if (this.game.canInteract && !this.game.player.interacting) {
            ctx.fillStyle = "white";
            ctx.font = "30px arial"
            ctx.fillText("Press [Down]", this.BB.midX - 60, 700 - 127 * 1.5, 120);
        }
        if (this.game.player.interacting) {
            this.game.menuController.stageSelect();
        }
        if (this.game.boxView) {
            ctx.beginPath();
            ctx.rect(this.BB.x, this.BB.y, this.BB.width, this.BB.height)
            ctx.strokeStyle = "Yellow";
            ctx.stroke();
        }
    };
}