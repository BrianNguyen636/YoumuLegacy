class Player extends Character{
    constructor(game) {
        super("player", "Youmu", game, 
            200, 150, 
            84*1.5, 127*1.5, 
            400, 700 - 127*1.5, 
            5);
        this.setController(new PlayerController(this, game));
    };

    loadAnimations() {
        this.animations[0][0] = new Animator(this.spritesheet, 0, 0, this.sWidth, this.sHeight, 8, 10); 
        this.animations[0][1] = new Animator(this.spritesheet, 0, 1 * this.sHeight, this.sWidth, this.sHeight, 8, 20);
        this.animations[0][2] = new Animator(this.spritesheet, 0, 2 * this.sHeight, this.sWidth, this.sHeight, 10, 20);
        this.animations[0][3] = new Animator(this.spritesheet, 0, 3 * this.sHeight, this.sWidth, this.sHeight, 2, 10);
        this.animations[0][4] = new Animator(this.spritesheet, 0, 4 * this.sHeight, this.sWidth, this.sHeight, 10, 20);
        this.animations[0][5] = new Animator(this.spritesheet, 0, 5 * this.sHeight, this.sWidth, this.sHeight, 8, 20);
        this.animations[0][6] = new Animator(this.spritesheet, 0, 6 * this.sHeight, this.sWidth, this.sHeight, 1, 20);
        //DEAD
        this.animations[0][7] = new Animator(this.spritesheet, 0, 6 * this.sHeight, this.sWidth, this.sHeight, 8, 20);
        this.animations[0][8] = new Animator(this.spritesheet, 6 * this.sWidth, 6 * this.sHeight, this.sWidth, this.sHeight, 2, 10);
        this.animations[0][9] = new Animator(this.spritesheet, 0, 7 * this.sHeight, this.sWidth, this.sHeight, 8, 15);
        this.animations[0][10] = new Animator(this.spritesheet, 7 * this.sWidth, 7 * this.sHeight, this.sWidth, this.sHeight, 1, 20);

        // this.animations[1][0] = new Animator(this.spritesheetFlip, 0, 0, this.sWidth, this.sHeight, 8, 10); 
        // this.animations[1][1] = new Animator(this.spritesheetFlip, 0, 1 * this.sHeight, this.sWidth, this.sHeight, 8, 20);
        // this.animations[1][2] = new Animator(this.spritesheetFlip, 0, 2 * this.sHeight, this.sWidth, this.sHeight, 10, 20);
        // this.animations[1][3] = new Animator(this.spritesheetFlip, 0, 3 * this.sHeight, this.sWidth, this.sHeight, 2, 10);
        // this.animations[1][4] = new Animator(this.spritesheetFlip, 0, 4 * this.sHeight, this.sWidth, this.sHeight, 10, 20);
        // this.animations[1][5] = new Animator(this.spritesheetFlip, 0, 5 * this.sHeight, this.sWidth, this.sHeight, 8, 20);
        // this.animations[1][6] = new Animator(this.spritesheetFlip, 0, 6 * this.sHeight, this.sWidth, this.sHeight, 1, 20);
        // //DEAD
        // this.animations[1][7] = new Animator(this.spritesheetFlip, 0, 6 * this.sHeight, this.sWidth, this.sHeight, 8, 20);
        // this.animations[1][8] = new Animator(this.spritesheetFlip, 6 * this.sWidth, 6 * this.sHeight, this.sWidth, this.sHeight, 2, 10);
        // this.animations[1][9] = new Animator(this.spritesheetFlip, 0, 7 * this.sHeight, this.sWidth, this.sHeight, 8, 15);
        // this.animations[1][10] = new Animator(this.spritesheetFlip, 7 * this.sWidth, 7 * this.sHeight, this.sWidth, this.sHeight, 1, 20);
    };

    updateBB() {
        switch(this.state) {
            default:
                if (this.facing == 0) {
                    this.BB = new BoundingBox(this.x + 84 * 1.5, this.y + 84 * 1.5, 27* 1.5, 43* 1.5); break;
                } else {
                    this.BB = new BoundingBox(this.x + 89 * 1.5, this.y + 84 * 1.5, 27* 1.5, 43* 1.5); break;
                }
        } 
    };

    hurt(other) {
        if (this.invuln <= 0 ) {
            this.health -= 1;
            this.invuln = 200 * this.game.clockTick;
            this.state = 6;
            this.controller.knockback(this.BB.midX - other.BB.midX);
        }
    };

    getAttackSpeed() {
        return this.animations[this.facing][5].totalTime;
    }

    updateAttackBox() {
        if (this.controller.attackDuration > 0 && this.controller.attackDuration < 6) {
            if (this.facing == 0) {
                this.attackBox = new BoundingBox(this.x + 110* 1.5, this.y, 90* 1.5, 120* 1.5);
            } else {
                this.attackBox = new BoundingBox(this.x, this.y, 90* 1.5, 120* 1.5);
            }
        } else this.attackBox = null;
    };

    update() {
        if (this.invuln > 0 && this.state < 6) this.invuln -= this.game.clockTick;
        this.controller.update();
        this.updateBB();
        this.updateAttackBox();
    };

    draw(ctx) {
        this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        if (this.game.boxView) {
            ctx.beginPath();
            ctx.rect(this.BB.x, this.BB.y, this.BB.width, this.BB.height)
            ctx.strokeStyle = "yellow";
            ctx.stroke();
            if (this.attackBox != null) {
                ctx.rect(this.attackBox.x, this.attackBox.y, this.attackBox.width, this.attackBox.height)
                ctx.strokeStyle = "red";
                ctx.stroke();
            }
        }
    };
}