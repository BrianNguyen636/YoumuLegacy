const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./assets/YoumuSpritesheet.png");
ASSET_MANAGER.queueDownload("./assets/YoumuSpritesheetFlip.png");
ASSET_MANAGER.queueDownload("./assets/YoumuEffects.png");
ASSET_MANAGER.queueDownload("./assets/MeilingSpritesheet.png");
ASSET_MANAGER.queueDownload("./assets/MeilingSpritesheetFlip.png");
ASSET_MANAGER.queueDownload("./assets/MeilingProjectiles.png");
ASSET_MANAGER.queueDownload("./assets/MeilingEffects.png");
ASSET_MANAGER.queueDownload("./assets/TenshiSpritesheet.png");
ASSET_MANAGER.queueDownload("./assets/TenshiSpritesheetFlip.png");
ASSET_MANAGER.queueDownload("./assets/TenshiProjectiles.png");
ASSET_MANAGER.queueDownload("./assets/TenshiEffects.png");
ASSET_MANAGER.queueDownload("./assets/OkuuSpritesheet.png");
ASSET_MANAGER.queueDownload("./assets/OkuuSpritesheetFlip.png");
ASSET_MANAGER.queueDownload("./assets/OkuuProjectiles.png");
ASSET_MANAGER.queueDownload("./assets/OkuuEffects.png");

ASSET_MANAGER.queueDownload("./assets/YuyukoSpritesheet.png");
ASSET_MANAGER.queueDownload("./assets/YuyukoPortrait.png");
ASSET_MANAGER.queueDownload("./assets/Stages.png");
ASSET_MANAGER.queueDownload("./assets/Health.png");
ASSET_MANAGER.queueDownload("./assets/Ghost.png");
ASSET_MANAGER.queueDownload("./assets/StartMenu.jpg");


ASSET_MANAGER.queueDownload("./assets/Audio/StartTheme.mp3");
ASSET_MANAGER.queueDownload("./assets/Audio/MeilingTheme.mp3");
ASSET_MANAGER.queueDownload("./assets/Audio/TenshiTheme.mp3");
ASSET_MANAGER.queueDownload("./assets/Audio/OkuuTheme.mp3");
ASSET_MANAGER.queueDownload("./assets/Audio/EndTheme.mp3");

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
ASSET_MANAGER.queueDownload("./assets/Audio/Flurry.wav");
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


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	const player = new Player(gameEngine);
	gameEngine.init(ctx, player);
	gameEngine.start();
});