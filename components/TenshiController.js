class TenshiController extends BossController{
    constructor(boss, game) {
        super(boss, game, 30);
    }
    setBossTime() {
        this.game.tenshiTime = Math.round((this.game.timer.gameTime - this.game.meilingTime) * 100) / 100;
    };
    behavior() {
        this.facePlayer();
    }
}