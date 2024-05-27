import { Application, Assets, Ticker } from 'pixi.js'
import { manifest } from './manifest';
import { Scene } from './Scene';
import { Keyboard } from './utills/Keyboard';
import { Group } from 'tweedle.js';


const app = new Application<HTMLCanvasElement>({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1366,
	height: 768
});

Keyboard.initialize();

window.addEventListener("resize", ()=>{
		
		const scaleX =  window.innerWidth / app.screen.width;
		const scaleY =	window.innerHeight / app.screen.height;
		const scale = Math.min(scaleX, scaleY);

		const gameWidth = app.screen.width * scale;
		const gameHeight = app.screen.height * scale;

		const marginHorizontal = (window.innerWidth - gameWidth) / 2;
		const marginVertical = (window.innerHeight - gameHeight) / 2;

		app.view.style.width = gameWidth + "px";
		app.view.style.height = gameHeight + "px";

		app.view.style.marginLeft = marginHorizontal + "px";
		app.view.style.marginRight = marginHorizontal + "px";
		
		app.view.style.marginTop = marginVertical + "px";
		app.view.style.marginBottom = marginVertical + "px";

});
window.dispatchEvent(new Event("resize"));

	
await Assets.init({ manifest: manifest });
await Assets.loadBundle("bundleCharacter");
await Assets.loadBundle("sonicAnimation");
await Assets.loadBundle("menuUI");

const escena1: Scene = new Scene();

app.stage.addChild(escena1);
Ticker.shared.add((deltaFrame)=>{
	Group.shared.update()
	escena1.update(Ticker.shared.deltaMS, deltaFrame)
})
