const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

let characters = ["Youmu", "Cirno", "Meiling", "Tenshi", "Okuu"];
characters.forEach((e) => {
	ASSET_MANAGER.queueDownload("./assets/" + e + "Spritesheet.png");
	ASSET_MANAGER.queueDownload("./assets/" + e + "SpritesheetFlip.png");
});

let effects = ["Youmu", "Meiling", "Tenshi", "Okuu"];
effects.forEach((e) => {ASSET_MANAGER.queueDownload("./assets/" + e + "Effects.png");});

let projectiles = ["Cirno", "Meiling", "Tenshi", "Okuu"];
projectiles.forEach((e) => {ASSET_MANAGER.queueDownload("./assets/" + e + "Projectiles.png");});

let themes = ["Menu", "Start", "Cirno", "Meiling", "Tenshi", "Okuu", "End"];
themes.forEach((e) => {ASSET_MANAGER.queueDownload("./assets/Audio/" + e + "Theme.mp3");});

ASSET_MANAGER.queueDownload("./assets/YuyukoSpritesheet.png");
ASSET_MANAGER.queueDownload("./assets/YuyukoPortrait.png");
ASSET_MANAGER.queueDownload("./assets/Stages.png");
ASSET_MANAGER.queueDownload("./assets/Health.png");
ASSET_MANAGER.queueDownload("./assets/Ghost.png");
ASSET_MANAGER.queueDownload("./assets/StartMenu.png");
ASSET_MANAGER.queueDownload("./assets/StartScreen.png");

ASSET_MANAGER.queueDownload("./assets/Audio/Select.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/Cancel.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/Pause.wav");

ASSET_MANAGER.queueDownload("./assets/Audio/Hurt.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/KO.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/Thud.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/Swing.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/Swish.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/Whoosh.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/Slash.wav");

ASSET_MANAGER.queueDownload("./assets/Audio/Stomp.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/Spray.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/Meiling1.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/Fly.wav");

ASSET_MANAGER.queueDownload("./assets/Audio/Shing.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/HisouSwing.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/HisouSlash.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/HisouStab.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/Rock.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/Pillar.wav");

ASSET_MANAGER.queueDownload("./assets/Audio/Boom.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/Okuu1.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/Okuu2.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/Okuu3.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/HeavySwing.wav");

ASSET_MANAGER.queueDownload("./assets/Audio/Cirno1.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/Cirno2.wav");
ASSET_MANAGER.queueDownload("./assets/Audio/Cirno3.wav");


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	const player = new Player(gameEngine);
	ctx.drawImage(ASSET_MANAGER.getAsset("./assets/StartScreen.png"), 0, 0);
	gameEngine.startScreen(ctx, player);
});
