class Keystone extends Projectile {
    constructor(x, y, game) {
        super(x, y, 200, 200, 22, 18, 95, 90, 0, 0, null, "Tenshi", 0, game);
        Object.assign(this, {x,y,game});
        this.gravity = 3000;
        this.bottom = this.y + 18 + 90;
        
    };
    static sfxPlayed = false;
    static setSfxPlayed(bool) {
        Keystone.sfxPlayed = bool;
    }
    behavior(){
        this.yVelocity += this.gravity * this.game.clockTick;
        if (this.y + 18 + 90 >= 700 + 25) {
            if (!Keystone.sfxPlayed) {
                this.game.audioManager.playSound("Rock.wav");
                Keystone.setSfxPlayed(true);
            }
            this.game.addEntity(new Effect(this.x, this.y, "Tenshi", 1, this.game));
            this.removeFromWorld = true;
        } 
    };
}