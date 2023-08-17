class Tenshi extends Character {
    constructor(game) {
        super("boss", "Tenshi", game, 
            200, 200, 
            (77+46) * 1.5 , 172 * 1.5, 
            600, 700 - 172*1.5, 
            1);
        this.controller = new TenshiController(this, game);
    };

    loadAnimations() {
        //IDLE
        this.makeAnimation(0, 0, 0, 6, 6);
        //JUMP
        this.makeAnimation(1, 1, 0, 10, 15);
        this.makeAnimation(2, 1, 8, 2, 10);
        //LAND
        this.makeAnimation(3, 2, 0, 6, 15);
        //SLASH WAVE
        this.makeAnimation(4, 3, 0, 4, 10);
        this.makeAnimation(5, 3, 3, 7, 15);
        this.makeAnimation(6, 3, 9, 1, 1);
        this.makeAnimation(7, 3, 9, 3, 15);
        //SLASH1
        this.makeAnimation(8, 4, 0, 1, 1);
        this.makeAnimation(9, 4, 0, 8, 15);
        this.makeAnimation(10, 4, 7, 1, 1);
        //SLASH2
        this.makeAnimation(11, 5, 0, 7, 15);
        this.makeAnimation(12, 5, 6, 1, 1);
        //SLASH3
        this.makeAnimation(13, 6, 0, 8, 15);
        this.makeAnimation(14, 6, 7, 1, 1);
        //SUMMON
        this.makeAnimation(15, 7, 0, 5, 15);
        this.makeAnimation(16, 7, 4, 1, 1);
        this.makeAnimation(17, 7, 4, 5, 15);
        //KNOCKBACK
        this.makeAnimation(30, 11, 0, 7, 15);
        this.makeAnimation(31, 11, 5, 2, 10);
        //DOWNED
        this.makeAnimation(32, 12, 0, 5, 15);
        this.makeAnimation(33, 12, 4, 1, 1);

    };

    updateBB() {
        switch(this.state) {
            default: 
                if (this.facing == 0) {
                    this.BB = new BoundingBox(this.x + 57* 1.5, this.y + 77* 1.5, 46* 1.5, 95* 1.5); break;
                } else {
                    this.BB = new BoundingBox(this.x + 97* 1.5, this.y + 77* 1.5, 46* 1.5, 95* 1.5); break;
                }
        }
    };
    update() {
        if (this.invuln > 0 && !this.dead()) this.invuln -= this.game.clockTick;
        if (this.game.roomManager.stage != 2) this.removeFromWorld = true;
        this.controller.update();
        this.updateBB();
    }
}