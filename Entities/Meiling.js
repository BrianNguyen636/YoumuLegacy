class Meiling extends Character {
    constructor(game){
        super("boss", "Meiling", game, 
            200, 150, 
            82*1.5, 123*1.5, 
            700, 700 - 123*1.5, 
            50);
        this.setController(new MeilingController(this, game));
        this.facing = 1;
    };

    loadAnimations() {
        //IDLE
        this.makeAnimation(0, 0, 0, 6, 10);
        //WALK
        this.makeAnimation(1, 1, 0, 6, 10);
        //FLURRY
        this.makeAnimation(2, 2, 0, 1, 1);
        this.makeAnimation(3, 2, 0, 2, 12);
        this.makeAnimation(4, 2, 2, 3, 12);
        this.makeAnimation(5, 2, 5, 1, 10);
        //TETSUZANKO
        this.makeAnimation(6, 3, 0, 4, 12);
        this.makeAnimation(7, 3, 3, 1, 1);
        this.makeAnimation(8, 3, 4, 1, 1);
        this.makeAnimation(9, 3, 5, 1, 1);
        this.makeAnimation(10, 3, 6, 3, 12);
        // //STOMP
        // this.makeAnimation(7, 4, 0, 3, 15);
        // this.makeAnimation(8, 4, 2, 1, 1);
        // this.makeAnimation(9, 4, 2, 7, 15);
        // //DRAGONKICK
        // this.makeAnimation(10, 5, 0, 2, 10);
        // this.makeAnimation(11, 5, 1, 1, 1);
        // this.makeAnimation(12, 5, 2, 1, 10);
        // this.makeAnimation(13, 5, 4, 2, 10);
        // this.makeAnimation(14, 5, 6, 2, 10);
        // this.makeAnimation(15, 5, 8, 2, 10);
        //PROJECTILE
        // this.makeAnimation(16, 6, 0, 8, 10);
        //KNOCKBACK
        this.makeAnimation(40, 7, 0, 8, 15);
        this.makeAnimation(41, 7, 6, 2, 10);
        //DEAD
        this.makeAnimation(42, 8, 0, 7, 15);
        this.makeAnimation(43, 8, 6, 1, 1);
    };

    updateBB() {
        switch(this.state) {
            case(5):
            case(6): {
                if (this.facing == 0) {
                    this.BB = new BoundingBox(this.x + 76* 1.5, this.y + 55* 1.5, 45* 1.5, 68* 1.5);
                } else {
                    this.BB = new BoundingBox(this.x + 76* 1.5, this.y + 55* 1.5, 45* 1.5, 68* 1.5);
                }
                break;
            }
            default: 
                if (this.facing == 0) {
                    this.BB = new BoundingBox(this.x + 76* 1.5, this.y + 25* 1.5, 45* 1.5, 98* 1.5);
                } else {
                    this.BB = new BoundingBox(this.x + 76* 1.5, this.y + 25* 1.5, 45* 1.5, 98* 1.5);
                }
                break;
        }
    };

    update() {
        if (this.invuln > 0 && !this.dead()) this.invuln -= this.game.clockTick;
        if (this.game.roomManager.stage != 2) this.removeFromWorld = true;
        this.controller.update();
        this.updateBB();
    }

}