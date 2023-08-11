class MenuController {
    constructor(game) {
        Object.assign(this, {game});
        this.selected = 0;
    }

    startMenu() {
        this.game.uiManager.drawStartMenu(this.game.ctx);
        if (this.game.up) {
            this.game.up = false;
            this.selected -= 1;
            if (this.selected < 0) this.selected = 1;
            this.game.audioManager.playSound("Select.wav");
        }
        if (this.game.down) {
            this.game.down = false;
            this.selected += 1;
            if(this.selected > 1) this.selected = 0;
            this.game.audioManager.playSound("Select.wav");
        }

        if (this.game.A && this.selected == 0) { //END START MENU
            this.game.A = false;
            this.game.audioManager.playSound("Select.wav");
            this.game.startMenu = false;
            this.game.roomManager.stageTransition(0);
        }
    }

}