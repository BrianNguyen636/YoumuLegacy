class AssetManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = [];
        this.downloadQueue = [];
        this.volume = 0.3;
        this.currentSong;
    };

    queueDownload(path) {
        if (gameEngine.debugging) console.log("Queueing " + path);
        this.downloadQueue.push(path);
    };

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    downloadAll(callback) {
        if (this.downloadQueue.length === 0) setTimeout(callback, 10);
        for (let i = 0; i < this.downloadQueue.length; i++) {
            const path = this.downloadQueue[i];
            if (gameEngine.debugging) console.log(path);

            let extension = path.substring(path.length-3);
            switch(extension) {
                case 'png':
                case 'jpg':
                    const img = new Image();
                    img.addEventListener("load", () => {
                        if (gameEngine.debugging) console.log("Loaded " + img.src);
                        this.successCount++;
                        if (this.isDone()) callback();
                    });
        
                    img.addEventListener("error", () => {
                        console.log("Error loading " + img.src);
                        this.errorCount++;
                        if (this.isDone()) callback();
                    });
        
                    img.src = path;
                    this.cache[path] = img;
                    break;
                case 'wav':
                case 'mp3':
                    const audio = new Audio();
                    audio.addEventListener("loadeddata", () => {
                        if (gameEngine.debugging) console.log("Loaded " + audio.src);
                        this.successCount++;
                        if (this.isDone()) callback();
                    });

                    audio.addEventListener("error", () => {
                        console.log("Error loading " + audio.src);
                        this.errorCount++;
                        if (this.isDone()) callback();
                    });
                    audio.addEventListener("ended", () => {
                        audio.pause();
                        audio.currentTime = 0;
                    });
                    audio.src = path;
                    audio.load();
                    audio.volume = this.volume;
                    this.cache[path] = audio;
                    break;
            };
        }
    };

    getAsset(path) {
        return this.cache[path];
    };

    playAudio(path) {
        let audio = this.cache[path];
        audio.currentTime = 0;
        audio.play();
    };

    playSound(name) {
        this.playAudio("./assets/Audio/" + name + ".wav");
    };
    playBGM(name) {
        if (this.currentSong != null) this.pauseBGM();
        let path = "./assets/Audio/" + name + ".mp3";
        this.currentSong = path;
        this.playAudio(path);
        this.autoRepeat(path);
    };
    pauseBGM() {
        let asset = this.cache[this.currentSong];
        asset.pause();
    };
    resumeBGM() {
        let asset = this.cache[this.currentSong];
        asset.play();
    }
    autoRepeat(path) {
        let aud = this.cache[path];
        aud.addEventListener("ended",  () => {
            aud.play();
        });
    };
    stop(path) {
        const audio = this.cache[path];
        audio.pause()
        audio.currentTime = 0;
    }
    adjustVolume(volume) {
        this.volume = Math.round(volume * 10) / 10;
        for (let key in this.cache) {
            let asset = this.cache[key];
            if (asset instanceof Audio) {
                asset.volume = volume;
            }
        }
    };
};

