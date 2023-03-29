class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, fps) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount});
        this.frameDuration = 1 / fps;
        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;
    };
    drawFrame(tick, ctx, x, y) {
        this.elapsedTime += tick;
        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        const frame = this.currentFrame();

        ctx.drawImage(this.spritesheet,
            this.xStart + this.width * frame, this.yStart,
            this.width, this.height,
            x, y, 
            this.width, this.height,
            );
    };
    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };
    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
    resetFrames() {
        this.elapsedTime = 0;
    };
};