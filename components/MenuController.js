class MenuController {
    constructor(game) {
        Object.assign(this, {game});
        this.selected = 0;
        this.options = false;
    }
    goToMainMenu() {
        this.restart();
        this.game.startMenu = true;
        this.game.audioManager.music.stop();
    }
    restart() {
        this.game.audioManager.playSound("Select.wav");
        this.game.reset();
    }
    optionSelection(optionCount) {
        if (this.game.up) {
            this.game.up = false;
            this.selected -= 1;
            if (this.selected < 0) this.selected = optionCount - 1;
            this.game.audioManager.playSound("Select.wav");
        }
        if (this.game.down) {
            this.game.down = false;
            this.selected += 1;
            if (this.selected > optionCount - 1) this.selected = 0;
            this.game.audioManager.playSound("Select.wav");
        }
    }
    startMenu() {
        this.game.uiManager.drawStartMenu(this.game.ctx);
        this.optionSelection(2);
        if (this.game.A && this.selected == 0) { //END START MENU
            this.game.A = false;
            this.game.audioManager.playSound("Select.wav");
            this.game.startMenu = false;
            this.game.roomManager.stageTransition(0);
        }
        if (this.game.A && this.selected == 1) { //END START MENU
            this.game.A = false;
            this.game.audioManager.playSound("Select.wav");
            this.optionsMenu();
            this.selected = 0;
        }
    }
    pauseMenu() {
        this.game.uiManager.drawPause(this.game.ctx);
        this.optionSelection(3);
        if ((this.game.A && this.selected == 0) || this.game.Esc) { //END PAUSE MENU
            if (this.game.Esc) this.game.Esc = false;
            if (this.game.A) this.game.A = false;
            this.game.audioManager.playSound("Cancel.wav");
            this.game.pause = false;
            this.game.audioManager.music.play();
        }
        if (this.game.A && this.selected == 1) { //RESTART
            this.game.A = false;
            this.restart();
        }
        if (this.game.A && this.selected == 2) { //MAIN MENU
            this.game.A = false;
            this.goToMainMenu();
        }
    }
    optionsMenu() {
        this.game.uiManager.drawOptions(this.game.ctx);
        this.optionSelection(3);
        this.options = true;
        if (this.selected == 1) { //VOLUME
            if(this.game.left) {
                this.game.left = false;
                if (this.game.audioManager.volume >= 0.1) this.game.audioManager.volume = this.game.audioManager.volume - 0.1;
                this.game.audioManager.playSound("Select.wav");
            }
            if (this.game.right) {
                this.game.right = false;
                if (this.game.audioManager.volume <= 0.9) this.game.audioManager.volume = this.game.audioManager.volume + 0.1;
                this.game.audioManager.playSound("Select.wav");
            }
        }
        if ((this.game.A && this.selected == 2) || this.game.Esc) { //RETURN
            if (this.game.A) this.game.A = false;
            if (this.game.Esc) this.game.Esc = false;
            this.game.audioManager.playSound("Cancel.wav");
            this.options = false;
            this.selected = 1;
        }
    }

}