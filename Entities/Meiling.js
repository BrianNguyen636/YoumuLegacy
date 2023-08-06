class Meiling extends Character {
    constructor(game){
        super("boss", "Meiling", game, 
            200, 150, 
            82*1.5, 123*1.5, 
            600, 700 - 123*1.5, 
            50);
        this.player = game.player
        this.setController(new MeilingController(this, game));
    };

    loadAnimations() {
        //IDLE
        this.animations[0][0] = new Animator(this.spritesheet, 0, 0, this.sWidth, this.sHeight, 6, 10); 
        //WALK
        this.animations[0][1] = new Animator(this.spritesheet, 0, 1 * this.sHeight, this.sWidth, this.sHeight, 6, 10);
        //FLURRY
        this.animations[0][2] = new Animator(this.spritesheet, 0, 2 * this.sHeight, this.sWidth, this.sHeight, 1, 20);
        this.animations[0][3] = new Animator(this.spritesheet, 0, 2 * this.sHeight, this.sWidth, this.sHeight, 15, 15);
        //TETSUZANKO
        this.animations[0][4] = new Animator(this.spritesheet, 0, 3 * this.sHeight, this.sWidth, this.sHeight, 4, 10);
        this.animations[0][5] = new Animator(this.spritesheet, 4 * this.sWidth, 3 * this.sHeight, this.sWidth, this.sHeight, 1, 15);
        this.animations[0][6] = new Animator(this.spritesheet, 4 * this.sWidth, 3 * this.sHeight, this.sWidth, this.sHeight, 7, 10);
        //STOMP
        this.animations[0][7] = new Animator(this.spritesheet, 0, 4 * this.sHeight, this.sWidth, this.sHeight, 3, 15);
        this.animations[0][8] = new Animator(this.spritesheet, 2 * this.sWidth, 4 * this.sHeight, this.sWidth, this.sHeight, 1, 15);
        this.animations[0][9] = new Animator(this.spritesheet, 2 * this.sWidth, 4 * this.sHeight, this.sWidth, this.sHeight, 7, 15);
        //DRAGONKICK
        this.animations[0][10] = new Animator(this.spritesheet, 0, 5 * this.sHeight, this.sWidth, this.sHeight, 2, 10);
        this.animations[0][11] = new Animator(this.spritesheet, 1 * this.sWidth, 5 * this.sHeight, this.sWidth, this.sHeight, 1, 10);
        this.animations[0][12] = new Animator(this.spritesheet, 2 * this.sWidth, 5 * this.sHeight, this.sWidth, this.sHeight, 1, 10);
        this.animations[0][13] = new Animator(this.spritesheet, 4 * this.sWidth, 5 * this.sHeight, this.sWidth, this.sHeight, 2, 10);
        this.animations[0][14] = new Animator(this.spritesheet, 6 * this.sWidth, 5 * this.sHeight, this.sWidth, this.sHeight, 3, 10);
        this.animations[0][15] = new Animator(this.spritesheet, 8 * this.sWidth, 5 * this.sHeight, this.sWidth, this.sHeight, 2, 10);
        //PROJECTILE
        this.animations[0][16] = new Animator(this.spritesheet, 0, 6 * this.sHeight, this.sWidth, this.sHeight, 8, 10);
        //KNOCKBACK
        this.animations[0][17] = new Animator(this.spritesheet, 0, 7 * this.sHeight, this.sWidth, this.sHeight, 8, 20);
        this.animations[0][18] = new Animator(this.spritesheet, 6 * this.sWidth, 7 * this.sHeight, this.sWidth, this.sHeight, 2, 10);
        //DEAD
        this.animations[0][19] = new Animator(this.spritesheet, 0, 8 * this.sHeight, this.sWidth, this.sHeight, 7, 15);
        this.animations[0][20] = new Animator(this.spritesheet, 6 * this.sWidth, 8 * this.sHeight, this.sWidth, this.sHeight, 1, 20);

        //IDLE
        this.animations[1][0] = new Animator(this.spritesheetFlip, 0, 0, this.sWidth, this.sHeight, 6, 10); 
        //WALK
        this.animations[1][1] = new Animator(this.spritesheetFlip, 0, 1 * this.sHeight, this.sWidth, this.sHeight, 6, 10);
        //FLURRY
        this.animations[1][2] = new Animator(this.spritesheetFlip, 0, 2 * this.sHeight, this.sWidth, this.sHeight, 1, 20);
        this.animations[1][3] = new Animator(this.spritesheetFlip, 0, 2 * this.sHeight, this.sWidth, this.sHeight, 15, 15);
        //TETSUZANKO
        this.animations[1][4] = new Animator(this.spritesheetFlip, 0, 3 * this.sHeight, this.sWidth, this.sHeight, 4, 10);
        this.animations[1][5] = new Animator(this.spritesheetFlip, 4 * this.sWidth, 3 * this.sHeight, this.sWidth, this.sHeight, 1, 15);
        this.animations[1][6] = new Animator(this.spritesheetFlip, 4 * this.sWidth, 3 * this.sHeight, this.sWidth, this.sHeight, 7, 10);
        //STOMP
        this.animations[1][7] = new Animator(this.spritesheetFlip, 0, 4 * this.sHeight, this.sWidth, this.sHeight, 3, 15);
        this.animations[1][8] = new Animator(this.spritesheetFlip, 2 * this.sWidth, 4 * this.sHeight, this.sWidth, this.sHeight, 1, 15);
        this.animations[1][9] = new Animator(this.spritesheetFlip, 2 * this.sWidth, 4 * this.sHeight, this.sWidth, this.sHeight, 7, 15);
        //DRAGONKICK
        this.animations[1][10] = new Animator(this.spritesheetFlip, 0, 5 * this.sHeight, this.sWidth, this.sHeight, 2, 10);
        this.animations[1][11] = new Animator(this.spritesheetFlip, 1 * this.sWidth, 5 * this.sHeight, this.sWidth, this.sHeight, 1, 10);
        this.animations[1][12] = new Animator(this.spritesheetFlip, 2 * this.sWidth, 5 * this.sHeight, this.sWidth, this.sHeight, 1, 10);
        this.animations[1][13] = new Animator(this.spritesheetFlip, 4 * this.sWidth, 5 * this.sHeight, this.sWidth, this.sHeight, 2, 10);
        this.animations[1][14] = new Animator(this.spritesheetFlip, 6 * this.sWidth, 5 * this.sHeight, this.sWidth, this.sHeight, 3, 10);
        this.animations[1][15] = new Animator(this.spritesheetFlip, 8 * this.sWidth, 5 * this.sHeight, this.sWidth, this.sHeight, 2, 10);
        //PROJECTILE
        this.animations[1][16] = new Animator(this.spritesheetFlip, 0, 6 * this.sHeight, this.sWidth, this.sHeight, 8, 10);
        //KNOCKBACK
        this.animations[1][17] = new Animator(this.spritesheetFlip, 0, 7 * this.sHeight, this.sWidth, this.sHeight, 8, 20);
        this.animations[1][18] = new Animator(this.spritesheetFlip, 6 * this.sWidth, 7 * this.sHeight, this.sWidth, this.sHeight, 2, 10);
        //DEAD
        this.animations[1][19] = new Animator(this.spritesheetFlip, 0, 8 * this.sHeight, this.sWidth, this.sHeight, 7, 15);
        this.animations[1][20] = new Animator(this.spritesheetFlip, 6 * this.sWidth, 8 * this.sHeight, this.sWidth, this.sHeight, 1, 20);
    };

    updateBB() {
        switch(this.state) {
            default: 
                if (this.facing == 0) {
                    this.BB = new BoundingBox(this.x + 72* 1.5, this.y + 25* 1.5, 36* 1.5, 98* 1.5); break;
                } else {
                    this.BB = new BoundingBox(this.x + 72* 1.5, this.y + 25* 1.5, 36* 1.5, 98* 1.5); break;
                }
        }
    };

    update() {
        if (this.invuln > 0 && !this.dead()) this.invuln -= 1;
        this.controller.update();
        this.updateBB();
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