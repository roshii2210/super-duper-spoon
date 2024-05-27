import { AssetsManifest } from 'pixi.js';

export const manifest: AssetsManifest = {
	bundles: [
		{
			name: "bundleCharacter",
			assets: {
				"Sonic": "./sonic-adventure.png",
				"Clampy": "./clampy.png",
				"Suelo": "suelo-nivel1.png",
				"plataforma": "plataforma.png",
				"Enemigo": "enemigo.png",
				"Balas": "Balas.png",
				"Piedra": "Piedra.png",
				"Pinchos": "Pinchos.png"
			}
		},
		{
			name: "sonicAnimation",
			assets: {
				"Sonic01": "./sonicAnim/sonic-adventure01.png",
				"Sonic02": "./sonicAnim/sonic-adventure02.png",
				"Sonic03": "./sonicAnim/sonic-adventure03.png",
				"Sonic04": "./sonicAnim/sonic-adventure04.png",
				"Sonic05": "./sonicAnim/sonic-adventure05.png",
				"Sonic06": "./sonicAnim/sonic-adventure06.png",
				"Sonic07": "./sonicAnim/sonic-adventure07.png",
				"Sonic08": "./sonicAnim/sonic-adventure08.png",
				"Sonic09": "./sonicAnim/sonic-adventure09.png",
				"Sonic10": "./sonicAnim/sonic-adventure10.png"
			}
		},
		{
			name: "menuUI",
			assets: {
				"Menus": "./uiMenu/ui-menu.png",
				"BotonMouse": "./uiMenu/boton-mouse.png",
				"BotonMousePress": "./uiMenu/boton-mouse-press.png",
				"BotonMouseSelect": "./uiMenu/boton-mouse-select.png",
				"BotonTouch": "./uiMenu/boton-touch.png",
				"BotonAmbos": "./uiMenu/boton-ambos.png"
			}
		}

	]
};
