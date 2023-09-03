class Cirno extends Character {
    constructor(game) {
        super("boss", "Cirno", game,
            200, 200,
            80 * 1.5, 153 * 1.5,
            600, 700 - 153 * 1.5 - 50,
            1
        );
        this.setController(new CirnoController(this, game));
        this.facing = 1;
    };
    loadAnimations() {
        //IDLE
        this.makeAnimation(0, 0, 0, 6, 8);

        //KNOCKBACK
        this.makeAnimation(40, 8, 0, 5, 12);
        this.makeAnimation(41, 8, 5, 2, 12);
        //DEAD
        this.makeAnimation(42, 9, 0, 9, 15);
        this.makeAnimation(43, 9, 8, 1, 1);
    };

    updateBB() {
        switch(this.state) {
            default: 
                if (this.facing == 0) {
                    this.BB = new BoundingBox(this.x + 80* 1.5, this.y + 80* 1.5, 40* 1.5, 73* 1.5); break;
                } else {
                    this.BB = new BoundingBox(this.x + 80* 1.5, this.y + 80* 1.5, 40* 1.5, 73* 1.5); break;
                }
        }
    };
    update() {
        if (this.invuln > 0 && !this.dead()) this.invuln -= this.game.clockTick;
        if (this.game.roomManager.stage != 1) this.removeFromWorld = true;
        this.controller.update();
        this.updateBB();
    }
}