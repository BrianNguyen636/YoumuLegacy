class Meiling extends Character {
    constructor(game){
        super("boss", "Meiling", game, 
            200, 150, 
            82*1.5, 123*1.5, 
            600, 700 - 123*1.5, 
            50);
        this.setController(new MeilingController(this, game));
    };

    loadAnimations() {
        //IDLE
        this.makeAnimation(0, 0, 0, 6, 10);
        //WALK
        this.makeAnimation(1, 1, 0, 6, 10);
        //FLURRY
        this.makeAnimation(2, 2, 0, 1, 15);
        this.makeAnimation(3, 2, 0, 15, 15);
        //TETSUZANKO
        this.makeAnimation(4, 3, 0, 4, 10);
        this.makeAnimation(5, 3, 4, 1, 10);
        this.makeAnimation(6, 3, 4, 7, 10);
        //STOMP
        this.makeAnimation(7, 4, 0, 3, 15);
        this.makeAnimation(8, 4, 2, 1, 15);
        this.makeAnimation(9, 4, 2, 7, 15);
        //DRAGONKICK
        this.makeAnimation(10, 5, 0, 2, 10);
        this.makeAnimation(11, 5, 1, 1, 10);
        this.makeAnimation(12, 5, 2, 1, 10);
        this.makeAnimation(13, 5, 4, 2, 10);
        this.makeAnimation(14, 5, 6, 3, 10);
        this.makeAnimation(15, 5, 8, 2, 10);
        //PROJECTILE
        this.makeAnimation(16, 6, 0, 8, 10);
        //KNOCKBACK
        this.makeAnimation(17, 7, 0, 8, 20);
        this.makeAnimation(18, 7, 6, 2, 10);
        //DEAD
        this.makeAnimation(19, 8, 0, 7, 15);
        this.makeAnimation(20, 8, 6, 1, 15);
    };

    updateBB() {
        switch(this.state) {
            default: 
                if (this.facing == 0) {
                    this.BB = new BoundingBox(this.x + 76* 1.5, this.y + 25* 1.5, 45* 1.5, 98* 1.5); break;
                } else {
                    this.BB = new BoundingBox(this.x + 76* 1.5, this.y + 25* 1.5, 45* 1.5, 98* 1.5); break;
                }
        }
    };

    update() {
        if (this.invuln > 0 && !this.dead()) this.invuln -= this.game.clockTick;
        this.controller.update();
        this.updateBB();
    }
    
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