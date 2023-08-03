class Player {
    constructor(game) {
        this.id = "player";
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/YoumuSpritesheet.png");
        this.spritesheetFlip = ASSET_MANAGER.getAsset("./assets/YoumuSpritesheetFlip.png");
        this.sWidth = 200;
        this.sHeight = 150;
        this.animations = [[],[]];
        this.loadAnimations();

        this.updateBB();
        this.attackBox;
        
        this.xBoxOffset = 84; //Distance between side and left collision box side
        this.yBoxOffset = 127; //Distance between top and collision box bottom 

        this.state = 0; //0 = idle, 1 = run, 2 = jump, 3 = fall, 4 = dash, 5 = attack, 6 = hurt, 7 = dead, 8 = fall hold, 9 = ground, 10 = ground hold
        this.facing = 0; //right or left

        this.x = 400;
        this.y = 700 - this.yBoxOffset;

        this.health = 1;
        this.invuln = 0;

        this.playerController = new PlayerController(this, game);
    };

    hurt(other) {
        if (this.invuln <= 0 ) {
            this.health -= 1;
            this.invuln = 200 * this.game.clockTick;
            this.state = 6;
            this.playerController.knockback(this.BB.midX - other.BB.midX);
        }
    };

    getAttackSpeed() {
        return this.animations[this.facing][5].totalTime;
    }

    updateAttackBox() {
        if (this.playerController.attackDuration > 0 && this.playerController.attackDuration < 6) {
            if (this.facing == 0) {
                this.attackBox = new BoundingBox(this.x + 110, this.y, 90, 120);
            } else {
                this.attackBox = new BoundingBox(this.x, this.y, 90, 120);
            }
        } else this.attackBox = null;
    };

    updateBB() {

        this.lastBB = this.BB;

        switch(this.state) {
            default:
                if (this.facing == 0) {
                    this.BB = new BoundingBox(this.x + 84, this.y + 84, 27, 43); break;
                } else {
                    this.BB = new BoundingBox(this.x + 89, this.y + 84, 27, 43); break;
                }
        } 
    };

    loadAnimations() {
        this.animations[0][0] = new Animator(this.spritesheet, 0, 0, this.sWidth, this.sHeight, 8, 10); 
        this.animations[0][1] = new Animator(this.spritesheet, 0, 1 * this.sHeight, this.sWidth, this.sHeight, 8, 20);
        this.animations[0][2] = new Animator(this.spritesheet, 0, 2 * this.sHeight, this.sWidth, this.sHeight, 10, 20);
        this.animations[0][3] = new Animator(this.spritesheet, 0, 3 * this.sHeight, this.sWidth, this.sHeight, 2, 10);
        this.animations[0][4] = new Animator(this.spritesheet, 0, 4 * this.sHeight, this.sWidth, this.sHeight, 10, 20);
        this.animations[0][5] = new Animator(this.spritesheet, 0, 5 * this.sHeight, this.sWidth, this.sHeight, 8, 20);
        this.animations[0][6] = new Animator(this.spritesheet, 0, 6 * this.sHeight, this.sWidth, this.sHeight, 1, 20);
        this.animations[0][7] = new Animator(this.spritesheet, 0, 6 * this.sHeight, this.sWidth, this.sHeight, 8, 20);
        this.animations[0][8] = new Animator(this.spritesheet, 6 * this.sWidth, 6 * this.sHeight, this.sWidth, this.sHeight, 2, 10);
        this.animations[0][9] = new Animator(this.spritesheet, 0, 7 * this.sHeight, this.sWidth, this.sHeight, 8, 20);
        this.animations[0][10] = new Animator(this.spritesheet, 7 * this.sWidth, 7 * this.sHeight, this.sWidth, this.sHeight, 1, 20);

        this.animations[1][0] = new Animator(this.spritesheetFlip, 0, 0, this.sWidth, this.sHeight, 8, 10); 
        this.animations[1][1] = new Animator(this.spritesheetFlip, 0, 1 * this.sHeight, this.sWidth, this.sHeight, 8, 20);
        this.animations[1][2] = new Animator(this.spritesheetFlip, 0, 2 * this.sHeight, this.sWidth, this.sHeight, 10, 20);
        this.animations[1][3] = new Animator(this.spritesheetFlip, 0, 3 * this.sHeight, this.sWidth, this.sHeight, 2, 10);
        this.animations[1][4] = new Animator(this.spritesheetFlip, 0, 4 * this.sHeight, this.sWidth, this.sHeight, 10, 20);
        this.animations[1][5] = new Animator(this.spritesheetFlip, 0, 5 * this.sHeight, this.sWidth, this.sHeight, 8, 20);
        this.animations[1][6] = new Animator(this.spritesheetFlip, 0, 6 * this.sHeight, this.sWidth, this.sHeight, 1, 20);
        this.animations[1][7] = new Animator(this.spritesheetFlip, 0, 6 * this.sHeight, this.sWidth, this.sHeight, 8, 20);
        this.animations[1][8] = new Animator(this.spritesheetFlip, 6 * this.sWidth, 6 * this.sHeight, this.sWidth, this.sHeight, 2, 10);
        this.animations[1][9] = new Animator(this.spritesheetFlip, 0, 7 * this.sHeight, this.sWidth, this.sHeight, 8, 20);
        this.animations[1][10] = new Animator(this.spritesheetFlip, 7 * this.sWidth, 7 * this.sHeight, this.sWidth, this.sHeight, 1, 20);
    };

    // handleYCollision() {
    //     this.yVelocity = 0;
    //     if (this.BB.y > this.lastBB.y) {
    //         this.y -= this.BB.y - this.lastBB.y;
    //         this.airborne = false;
    //     } else {
    //         this.y += this.lastBB.y - this.BB.y;
    //     }
    // };
    // handleXCollision() {
    //     if (this.BB.x > this.lastBB.x) {
    //         this.x -= (this.BB.x - this.lastBB.x);
    //     } else {
    //         this.x += (this.lastBB.x - this.BB.x);
    //     }
    // };

    update() {
        if (this.invuln > 0 && this.state < 6) this.invuln -= this.game.clockTick;
        this.playerController.update();
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