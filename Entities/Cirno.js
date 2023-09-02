class Cirno extends Character {
    constructor(game) {
        super("boss", "Cirno", game,
            200, 200,
            80 * 1.5, 153 * 1.5,
            600, 700 - 153 * 1.5,
            50
        );
        this.facing = 1;
    };
    loadAnimations() {
        //IDLE
        this.makeAnimation(0, 0, 0, 6, 12);
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
        // this.controller.update();
        this.updateBB();
    }
}