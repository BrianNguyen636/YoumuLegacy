class Okuu extends Character {
    constructor(game) {
        super("boss", "Okuu", game,
            250, 200, 90*1.5, 167*1.5,
            700, 700 - 167*1.5,
            50
        );
        this.controller = new OkuuController(this, game);
        this.facing = 1;
    };
    loadAnimations() {
        //IDLE
        this.makeAnimation(0, 0, 1, 23, 12);
        //FALLING
        this.makeAnimation(1, 1, 0, 6, 15);
        this.makeAnimation(2, 1, 5, 1, 1);
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
        //RUSH
        this.makeAnimation(14, 4, 0, 3, 15);
        this.makeAnimation(15, 4, 2, 1, 1);
        this.makeAnimation(16, 4, 3, 1, 12);
        this.makeAnimation(17, 4, 4, 4, 12);
        //NOVA
        this.makeAnimation(18, 5, 0, 2, 15);
        this.makeAnimation(19, 5, 2, 2, 10);
        this.makeAnimation(20, 5, 4, 5, 10);
        this.makeAnimation(21, 5, 9, 3, 12);
        this.makeAnimation(22, 5, 12, 3, 15);
        //FLIGHT
        this.makeAnimation(23, 6, 0, 1, 1);
        this.makeAnimation(24, 6, 1, 2, 12);
        this.makeAnimation(25, 6, 3, 2, 12);
        this.makeAnimation(26, 6, 3, 3, 12);
        //SWING
        this.makeAnimation(27, 7, 0, 2, 12);
        this.makeAnimation(28, 7, 1, 1, 1);
        this.makeAnimation(29, 7, 1, 7, 12);
        this.makeAnimation(30, 7, 8, 2, 10);
        this.makeAnimation(31, 7, 10, 1, 15);
        //FLASHKICK
        this.makeAnimation(32, 7, 11, 1, 1);
        this.makeAnimation(33, 7, 11, 9, 12);
        //KNOCKBACK
        this.makeAnimation(40, 8, 0, 8, 15);
        this.makeAnimation(41, 8, 5, 3, 10);
        //DEAD
        this.makeAnimation(42, 9, 0, 7, 15);
        this.makeAnimation(43, 9, 6, 1, 1);
    };
    updateBB() {
        switch(this.state) {
            case 16:
            case 17: {
                if (this.facing == 0) {
                    this.BB = new BoundingBox(this.x + 70* 1.5, this.y + 90* 1.5, 101* 1.5, 51* 1.5); break;
                } else {
                    this.BB = new BoundingBox(this.x + 79* 1.5, this.y + 90* 1.5, 101* 1.5, 51* 1.5); break;
                }
            }
            case 29:
            case 30: {
                if (this.facing == 0) {
                    this.BB = new BoundingBox(this.x + 90* 1.5, this.y + 74* 1.5, 60* 1.5, 93* 1.5); break;
                } else {
                    this.BB = new BoundingBox(this.x + 99* 1.5, this.y + 74* 1.5, 60* 1.5, 93* 1.5); break;
                }
            }
            
            default: 
                if (this.facing == 0) {
                    this.BB = new BoundingBox(this.x + 90* 1.5, this.y + 59* 1.5, 60* 1.5, 108* 1.5); break;
                } else {
                    this.BB = new BoundingBox(this.x + 99* 1.5, this.y + 59* 1.5, 60* 1.5, 108* 1.5); break;
                }
        }
    };
}