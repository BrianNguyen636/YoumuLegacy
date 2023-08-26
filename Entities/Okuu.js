class Okuu extends Character {
    constructor(game) {
        super("boss", "Okuu", game,
            250, 200, 90*1.5, 167*1.5,
            700, 700 - 167*1.5,
            1
        );
        this.controller = new OkuuController(this, game);
        this.facing = 1;
    };
    loadAnimations() {
        //IDLE
        this.makeAnimation(0, 0, 1, 23, 12);

        //SLAM
        this.makeAnimation(4, 2, 0, 3, 15);
        this.makeAnimation(5, 2, 1, 2, 10);
        this.makeAnimation(6, 2, 1, 7, 15);
        this.makeAnimation(7, 2, 7, 2, 10);
        this.makeAnimation(8, 2, 8, 3, 15);
        //BURST
        this.makeAnimation(9, 3, 0, 4, 15);
        this.makeAnimation(10, 3, 3, 2, 10);
        this.makeAnimation(11, 3, 5, 4, 15);
        this.makeAnimation(12, 3, 8, 2, 10);
        this.makeAnimation(13, 3, 9, 4, 10);

        //KNOCKBACK
        this.makeAnimation(40, 8, 0, 8, 15);
        this.makeAnimation(41, 8, 5, 3, 10);
        //DEAD
        this.makeAnimation(42, 9, 0, 7, 15);
        this.makeAnimation(43, 9, 6, 1, 1);
    };
    updateBB() {
        switch(this.state) {
            default: 
                if (this.facing == 0) {
                    this.BB = new BoundingBox(this.x + 90* 1.5, this.y + 59* 1.5, 60* 1.5, 108* 1.5); break;
                } else {
                    this.BB = new BoundingBox(this.x + 99* 1.5, this.y + 59* 1.5, 60* 1.5, 108* 1.5); break;
                }
        }
    };
    update() {
        if (this.invuln > 0 && !this.dead()) this.invuln -= this.game.clockTick;
        if (this.game.roomManager.stage != 3) this.removeFromWorld = true;
        this.controller.update();
        this.updateBB();
    };
}