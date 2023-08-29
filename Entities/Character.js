class Character {
    constructor(id, name, game, sWidth, sHeight, xBoxOffset, yBoxOffset, x, y, health) {
        if (this.constructor === Character) throw new Error("Abstract Character Class");
        Object.assign(this, {id, name, game, 
            sWidth, sHeight, 
            xBoxOffset, yBoxOffset, //Distance between x and left of BB, Distance between y and bottom of BB.
            x, y, 
            health});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/" + name + "Spritesheet.png");
        this.spritesheetFlip = ASSET_MANAGER.getAsset("./assets/" + name + "SpritesheetFlip.png");
        this.animations = [[],[]];
        this.loadAnimations();
        this.updateBB();
        this.state = 0; 
        this.facing = 1;
        this.invuln = 0; 
    };
    setController(controller) {this.controller = controller};

    dead() {return this.health <= 0};

    hurt(other) {
        if (this.invuln <= 0 ) {
            this.health -= 1;
            this.invuln = this.game.player.getAttackDuration();
            ASSET_MANAGER.playSound("Slash");
            if (this.game.player.facing == 0) this.game.addEntity(new Effect(this.BB.midX - 70, this.BB.midY - 120, "Youmu", 0, this.game));
            else this.game.addEntity(new Effect(this.BB.midX - 70, this.BB.midY - 120, "Youmu", 1, this.game));
        }
        
    }
    updateBB() {
        console.log("Update BB");
    };
    loadAnimations() {
        console.log("Load Animations");
    };

    makeAnimation(number, row, column, frameCount, fps) {
        this.animations[0][number] = new Animator(this.spritesheet, column * this.sWidth, row * this.sHeight, this.sWidth, this.sHeight, frameCount, fps); 
        this.animations[1][number] = new Animator(this.spritesheetFlip, column * this.sWidth, row * this.sHeight, this.sWidth, this.sHeight, frameCount, fps); 
    };

    drawShadow(ctx) {
        let distance = 700 - this.BB.bottom;
        let scale = 1 - distance / 700;
        if (scale < 0) scale = 0;
        ctx.beginPath();
        ctx.save();
        ctx.ellipse(this.BB.midX, 700, 70 * scale, 12 * scale, 0, 0, 2 * Math.PI);
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.restore();
    }

    draw(ctx) {
        this.drawShadow(ctx);
        this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y);

        if (this.game.boxView) {
            ctx.beginPath();
            ctx.rect(this.BB.x, this.BB.y, this.BB.width, this.BB.height)
            ctx.strokeStyle = "Yellow";
            ctx.stroke();
        }
    };



}