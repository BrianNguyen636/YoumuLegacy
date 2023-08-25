class Player extends Character{
    constructor(game) {
        super("player", "Youmu", game, 
            200, 150, 
            84*1.5, 127*1.5, 
            400, 700 - 127*1.5, 
            5);
        this.facing = 0;
        this.setController(new PlayerController(this, game));
        this.interacting = false;
    };

    loadAnimations() {
        this.makeAnimation(0, 0, 0, 8, 10); //IDLE
        this.makeAnimation(1, 1, 0, 8, 20); //WALK
        this.makeAnimation(2, 2, 0, 10, 20); //JUMP
        this.makeAnimation(3, 3, 0, 2, 10); //FALL
        this.makeAnimation(4, 4, 0, 10, 20); //ATTACK
        this.makeAnimation(5, 5, 0, 8, 20); //DASH
        this.makeAnimation(6, 6, 0, 1, 1); //HURT
        this.makeAnimation(7, 6, 0, 8, 20); //DEAD
        this.makeAnimation(8, 6, 6, 1, 1); //DEAD FALL
        this.makeAnimation(9, 7, 0, 8, 15); //GROUND BOUNCE
        this.makeAnimation(10, 7, 7, 1, 1); //GAME OVER
    };

    updateBB() {
        switch(this.state) {
            default:
                if (this.facing == 0) {
                    this.BB = new BoundingBox(this.x + 84 * 1.5, this.y + 84 * 1.5, 27* 1.5, 43* 1.5);
                } else {
                    this.BB = new BoundingBox(this.x + 89 * 1.5, this.y + 84 * 1.5, 27* 1.5, 43* 1.5);
                }
            break;
        } 
    };

    hurt(other) {
        if (this.invuln <= 0 ) {
            this.health -= 1;
            this.invuln = 2;
            this.state = 6;
            this.controller.knockback(this.BB.midX - other.BB.midX);
        }
    };

    getAttackDuration() {
        return this.controller.attackDuration;
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
        if (!this.interacting) this.controller.update();
        this.updateBB();
        this.updateAttackBox();
    };

    draw(ctx) {
        this.drawShadow(ctx);
        if (this.invuln > 0 && !this.dead()) ctx.globalAlpha = 0.5;
        this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        ctx.globalAlpha = 1;

        if (this.game.boxView) {
            ctx.strokeStyle = "yellow";
            ctx.beginPath();
            
            ctx.rect(this.BB.x, this.BB.y, this.BB.width, this.BB.height)
            
            ctx.stroke();
            if (this.attackBox != null) {
                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.rect(this.attackBox.x, this.attackBox.y, this.attackBox.width, this.attackBox.height)
                ctx.stroke();
            }
        }
    };
}