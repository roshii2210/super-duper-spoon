import { Application, Assets, AssetsManifest, Sprite } from 'pixi.js'

const app = new Application<HTMLCanvasElement>({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});


export const manifest:AssetsManifest = {
	bundles: [
		{
			name : "bundleCharacter",
			assets:
			{
				"Sonic" : "./sonic-adventure.png",
				"Clampy" : "./clampy.png",
			}

		},
	]
}

async function init() {

	await Assets.init({ manifest: manifest });

	await Assets.loadBundle("bundleCharacter");

	const sonic: Sprite = Sprite.from("sonic-adventure.png")

	app.stage.addChild(sonic);
}

init();