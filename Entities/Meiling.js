class Meiling {
    constructor(game, player){
        this.id = "boss";
        this.game = game;
        this.player = player;
        this.spritesheet = ASSET_MANAGER.getAsset("./MeilingSpritesheet.png");
        this.spritesheetFlip = ASSET_MANAGER.getAsset("./MeilingSpritesheetFlip.png");
        this.sWidth = 200;
        this.sHeight = 150;
        this.animations = [[],[]];
        this.loadAnimations();


        this.xBoxOffset = 68; //Distance between side and left collision box side
        this.yBoxOffset = 123; //Distance between top and collision box bottom 

        this.state = 0; //0 = idle, 1 = FlurryWait, 2 = Flurry, 3 = Zanko, 4 = Stomp, 5 = DragonkickHold, 6 = Dragonkick recover, 7 = fall
        this.facing = 1; //right or left

        this.x = 600;
        this.y = 600 - this.yBoxOffset;
        this.updateBB();

        this.health = 50;
        this.invuln = 0;
    };

    hurt(other) {
        if (this.invuln <= 0 ) {
            this.health -= 1;
            this.invuln = this.player.getAttackSpeed() / this.game.clockTick + 1;
            console.log(this.player.getAttackSpeed());
        }
    };

    updateBB() {

        this.lastBB = this.BB;

        switch(this.state) {
            default: 
                if (this.facing == 0) {
                    this.BB = new BoundingBox(this.x + 68, this.y + 25, 64, 98); break;
                } else {
                    this.BB = new BoundingBox(this.x + 68, this.y + 25, 64, 98); break;
                }
        }
    };


    loadAnimations() {
        this.animations[0][0] = new Animator(this.spritesheet, 0, 0, this.sWidth, this.sHeight, 6, 10); 
        this.animations[0][1] = new Animator(this.spritesheet, 0, 1 * this.sHeight, this.sWidth, this.sHeight, 1, 20);
        this.animations[0][2] = new Animator(this.spritesheet, 0, 1 * this.sHeight, this.sWidth, this.sHeight, 15, 15);
        this.animations[0][3] = new Animator(this.spritesheet, 0, 2 * this.sHeight, this.sWidth, this.sHeight, 9, 15);
        this.animations[0][4] = new Animator(this.spritesheet, 0, 3 * this.sHeight, this.sWidth, this.sHeight, 9, 15);
        this.animations[0][5] = new Animator(this.spritesheet, 0, 4 * this.sHeight, this.sWidth, this.sHeight, 2, 10);
        this.animations[0][6] = new Animator(this.spritesheet, 0, 4 * this.sHeight, this.sWidth, this.sHeight, 4, 10);
        this.animations[0][7] = new Animator(this.spritesheet, 0, 5 * this.sHeight, this.sWidth, this.sHeight, 2, 10);

        this.animations[1][0] = new Animator(this.spritesheetFlip, 0, 0, this.sWidth, this.sHeight, 6, 10); 
        this.animations[1][1] = new Animator(this.spritesheetFlip, 0, 1 * this.sHeight, this.sWidth, this.sHeight, 1, 20);
        this.animations[1][2] = new Animator(this.spritesheetFlip, 0, 1 * this.sHeight, this.sWidth, this.sHeight, 15, 15);
        this.animations[1][3] = new Animator(this.spritesheetFlip, 0, 2 * this.sHeight, this.sWidth, this.sHeight, 9, 15);
        this.animations[1][4] = new Animator(this.spritesheetFlip, 0, 3 * this.sHeight, this.sWidth, this.sHeight, 9, 15);
        this.animations[1][5] = new Animator(this.spritesheetFlip, 0, 4 * this.sHeight, this.sWidth, this.sHeight, 2, 10);
        this.animations[1][6] = new Animator(this.spritesheetFlip, 0, 4 * this.sHeight, this.sWidth, this.sHeight, 4, 10);
        this.animations[1][7] = new Animator(this.spritesheetFlip, 0, 5 * this.sHeight, this.sWidth, this.sHeight, 2, 10);

    };

    update() {
        this.updateBB();
        if (this.invuln > 0) this.invuln -= 1;
        if (this.x + this.xBoxOffset <= 0) { //LEFT COLLISION
            this.x = 0 - this.xBoxOffset;
        }
        if (this.x + this.xBoxOffset + this.BB.width >= 1280) { //RIGHT COLLISION
            this.x = 1280 - this.xBoxOffset - this.BB.width;
        }
        if (this.x < this.player.x) {
            this.facing = 0;
        } else this.facing = 1;

        // if (this.BB.collide(this.player.BB)) {
        //     this.player.hurt(this);
        // }

        this.state = 0;
    }

    drawHealthBar(ctx) {
        const healthPercent = this.health / 50;
        ctx.fillStyle = "Green";
        ctx.fillRect(240, 740, 800, 20);
        ctx.fillStyle = "Red";
        ctx.fillRect(1040 - 800*(1 - healthPercent), 740, 800*(1 - healthPercent), 20);
    }

    draw(ctx) {
        this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        this.drawHealthBar(ctx);
        if (this.game.boxView) {
            ctx.beginPath();
            ctx.rect(this.BB.x, this.BB.y, this.BB.width, this.BB.height)
            ctx.strokeStyle = "yellow";
            ctx.stroke();
        }
    };
}