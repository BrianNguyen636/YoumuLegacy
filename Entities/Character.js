class Character {
    constructor(id, name, game, sWidth, sHeight, xBoxOffset, yBoxOffset, x, y, health) {
        if (this.constructor === Character) throw new Error("Abstract Character Class");
        Object.assign(this, {id, name, game, 
            sWidth, sHeight, 
            xBoxOffset, yBoxOffset, //Distance between x and left of BB, Distance between y and bottom of BB.
            x, y, 
            health});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/" + name + "Spritesheet.png");
        this.spritesheetFlip = ASSET_MANAGER.getAsset("./assets/" + name + "SpritesheetFlip.png");
        this.animations = [[],[]];
        this.loadAnimations();
        this.loadAnimationsFlipped();
        this.updateBB();
        this.state = 0; 
        this.facing = 0;
        this.invuln = 0; 
    };
    setController(controller) {this.controller = controller};

    dead() {return this.health <= 0};

    updateBB() {
        console.log("Update BB");
    };
    loadAnimations() {
        console.log("Load Animations");
    };

    loadAnimationsFlipped() {
        for (let i = 0; i < this.animations[0].length; i++) {
            let a = this.animations[0][i];
            this.animations[1][i] = new Animator(this.spritesheetFlip, a.xStart, a.yStart, a.width, a.height, a.frameCount, a.fps);
            // console.log(a.yStart);
        }
    };
}