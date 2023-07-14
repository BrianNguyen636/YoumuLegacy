class Meiling {
    constructor(game){
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./MeilingSpritesheet.png");
        this.spritesheetFlip = ASSET_MANAGER.getAsset("./MeilingSpritesheetFlip.png");
        this.sWidth = 200;
        this.sHeight = 150;
        this.animations = [[],[]];
        this.loadAnimations();

        this.xBoxOffset = 68; //Distance between side and left collision box side
        this.yBoxOffset = 123; //Distance between top and collision box bottom 

        this.state = 0; //0 = idle, 1 = FlurryWait, 2 = Flurry
        this.facing = 1; //right or left

        this.x = 1000;
        this.y = 600 - this.yBoxOffset;

        this.health = 50;
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
        this.animations[0][2] = new Animator(this.spritesheet, this.sWidth, 1 * this.sHeight, this.sWidth, this.sHeight, 14, 15);
        this.animations[0][3] = new Animator(this.spritesheet, 0, 2 * this.sHeight, this.sWidth, this.sHeight, 9, 15);

        this.animations[1][0] = new Animator(this.spritesheetFlip, 0, 0, this.sWidth, this.sHeight, 6, 10); 
        this.animations[1][1] = new Animator(this.spritesheetFlip, 0, 1 * this.sHeight, this.sWidth, this.sHeight, 1, 20);
        this.animations[1][2] = new Animator(this.spritesheetFlip, this.sWidth, 1 * this.sHeight, this.sWidth, this.sHeight, 14, 15);
        this.animations[1][3] = new Animator(this.spritesheetFlip, 0, 2 * this.sHeight, this.sWidth, this.sHeight, 9, 15);

    };

    update() {
        this.updateBB();
        if (this.x + this.xBoxOffset <= 0) { //LEFT COLLISION
            this.x = 0 - this.xBoxOffset;
        }
        if (this.x + this.xBoxOffset + this.BB.width >= 1280) { //RIGHT COLLISION
            this.x = 1280 - this.xBoxOffset - this.BB.width;
        }
        this.state = 0;
    }

    draw(ctx) {
        this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        if (this.game.boxView) {
            ctx.beginPath();
            ctx.rect(this.BB.x, this.BB.y, this.BB.width, this.BB.height)
            ctx.strokeStyle = "yellow";
            ctx.stroke();
        }
    };
}