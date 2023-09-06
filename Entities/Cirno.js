class Cirno extends Character {
    constructor(game) {
        super("boss", "Cirno", game,
            200, 200,
            80 * 1.5, 153 * 1.5,
            700, 700 - 153 * 1.5 - 50,
            50
        );
        this.setController(new CirnoController(this, game));
        this.facing = 1;
    };
    loadAnimations() {
        //IDLE
        this.makeAnimation(0, 0, 0, 6, 8);
        //DASH
        this.makeAnimation(1, 1, 0, 2, 12);
        this.makeAnimation(2, 1, 1, 1, 1);
        this.makeAnimation(3, 1, 2, 4, 12);
        this.makeAnimation(4, 1, 6, 1, 1);
        //SPIN
        this.makeAnimation(5, 2, 0, 3, 12);
        this.makeAnimation(6, 2, 2, 1, 1);
        this.makeAnimation(7, 2, 3, 2, 12);
        this.makeAnimation(8, 2, 5, 4, 12);
        this.makeAnimation(9, 2, 9, 2, 12);
        //SHOT
        this.makeAnimation(10, 3, 0, 2, 12);
        this.makeAnimation(11, 3, 2, 2, 12);
        this.makeAnimation(12, 3, 4, 4, 15);
        this.makeAnimation(13, 3, 7, 1, 1);
        this.makeAnimation(14, 3, 7, 3, 12);
        //LOB
        this.makeAnimation(15, 4, 0, 2, 12);
        this.makeAnimation(16, 4, 2, 2, 12);
        this.makeAnimation(17, 4, 4, 3, 12);
        this.makeAnimation(18, 4, 7, 1, 12);
        //BURST
        this.makeAnimation(19, 5, 0, 3, 12);
        this.makeAnimation(20, 5, 2, 1, 1);
        this.makeAnimation(21, 5, 3, 1, 12);
        this.makeAnimation(22, 5, 4, 2, 12);
        this.makeAnimation(23, 5, 6, 1, 12);

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

}