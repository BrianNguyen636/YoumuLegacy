class AudioManager {
    constructor(game) {
        this.game = game;
        this.music = null;
        this.volume = 0.3;
    }
    adjustVolume(volume) {
      this.volume = volume;
    }
    playBGM(src) {
        if (this.music != null) this.music.stop();
        this.music = new Sound("./assets/Audio/" + src + ".mp3", this.volume);
        this.music.play();
    }
    playSound(src) {
      let sound = new Sound("./assets/Audio/" + src, this.volume);
      sound.play();
    }
}    
//From W3 schools
function Sound(src, volume) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.sound.volume = volume;
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
}
