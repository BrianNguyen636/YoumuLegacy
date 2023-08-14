class Tenshi extends Character {
    constructor(game) {
        super("boss", "Tenshi", game, 
            200, 200, 
            (77+46) * 1.5 , 192 * 1.5, 
            600, 700 - 192*1.5, 
            1);
        this.controller = new TenshiController(this, game);
    };

    loadAnimations() {
        //IDLE
        this.makeAnimation(0, 0, 0, 6, 6);
        //JUMP
        this.makeAnimation(1, 1, 0, 10, 15);
        this.makeAnimation(2, 1, 8, 2, 15);

        //KNOCKBACK
        this.makeAnimation(30, 8, 0, 7, 15);
        this.makeAnimation(31, 8, 5, 2, 10);
        //DOWNED
        this.makeAnimation(32, 9, 0, 5, 15);
        this.makeAnimation(33, 9, 4, 1, 1);

    };

    updateBB() {
        switch(this.state) {
            default: 
                if (this.facing == 0) {
                    this.BB = new BoundingBox(this.x + 77* 1.5, this.y + 97* 1.5, 46* 1.5, 95* 1.5); break;
                } else {
                    this.BB = new BoundingBox(this.x + 77* 1.5, this.y + 97* 1.5, 46* 1.5, 95* 1.5); break;
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