class Tenshi extends Character {
    constructor(game) {
        super("boss", "Tenshi", game, 
            200, 200, 
            (77+46) * 1.5 , 172 * 1.5, 
            700, 700 - 172*1.5 - 800, 
            50);
        this.controller = new TenshiController(this, game);
        this.facing = 1;
        this.state = 20;
        this.controller.attackDuration = 10;
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
        this.makeAnimation(4, 3, 0, 4, 8);
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
        //GROUNDPOUND
        this.makeAnimation(18, 1, 0, 10, 15);
        this.makeAnimation(19, 8, 0, 8, 20);
        this.makeAnimation(20, 8, 6, 2, 10);
        this.makeAnimation(21, 8, 8, 7, 15);
        //STAB
        this.makeAnimation(22, 9, 0, 9, 15);
        this.makeAnimation(23, 9, 8, 1, 1);
        this.makeAnimation(24, 9, 8, 4, 15);
        this.makeAnimation(25, 9, 11, 1, 1);
        this.makeAnimation(26, 9, 11, 4, 15);
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
}