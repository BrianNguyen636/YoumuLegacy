class Okuu extends Character {
    constructor(game) {
        super("boss", "Okuu", game,
            250, 200, 90*1.5, 167*1.5,
            600, 700 - 167*1.5,
            50
        );
        this.facing = 1;
    };
    loadAnimations() {
        this.makeAnimation(0, 0, 1, 23, 12);
    };
    updateBB() {
        switch(this.state) {
            default: 
                if (this.facing == 0) {
                    this.BB = new BoundingBox(this.x + 90* 1.5, this.y + 59* 1.5, 66* 1.5, 108* 1.5); break;
                } else {
                    this.BB = new BoundingBox(this.x + 93* 1.5, this.y + 59* 1.5, 66* 1.5, 108* 1.5); break;
                }
        }
    };
    update() {
        this.updateBB();
    };
}