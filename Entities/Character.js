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
            this.invuln = this.game.player.getAttackSpeed();
            this.game.audioManager.playSound("Slash.wav");
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

    draw(ctx) {

        this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y);

        if (this.game.boxView) {
            ctx.beginPath();
            ctx.rect(this.BB.x, this.BB.y, this.BB.width, this.BB.height)
            ctx.strokeStyle = "green";
            ctx.stroke();
        }
    };



}