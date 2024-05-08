import { Container, Sprite, Texture} from "pixi.js";
import { SonicClampy } from "./SonicClampy";
import { IUpdateable } from "./IUpdateable";
import { Keyboard } from "./utills/Keyboard";
import { Platform } from "./Platform";
import { checkCollision } from "./IHitbox";
//import { Menu } from "./menu";



export class Scene extends Container implements IUpdateable{

    //private sonicRuns: AnimatedSprite
    private sonicandClampy: SonicClampy = new SonicClampy;
    private texturaSuelo: Texture = Texture.from("Suelo");
    private suelo: Sprite = new Sprite(this.texturaSuelo);
    plataforma1: Platform;
    constructor(){
        super();

        this.suelo.y = 500;
        

        this.plataforma1 = new Platform();

        /*this.sonicRuns = new AnimatedSprite(
            [
                Texture.from("Sonic01"),
                Texture.from("Sonic02"),
                Texture.from("Sonic03"),
                Texture.from("Sonic04"),
                Texture.from("Sonic05"),
                Texture.from("Sonic06"),
                Texture.from("Sonic07"),
                Texture.from("Sonic08"),
                Texture.from("Sonic09"),
                Texture.from("Sonic10"),
            ], false
        )

        this.addChild(this.sonicRuns)
        this.sonicRuns.play();*/

	    

        this.plataforma1.scale.set(1,0.7);
        this.plataforma1.position.set(300, 350);
        

	    this.addChild(this.suelo, this.plataforma1);

        this.addChild(this.sonicandClampy);
        this.sonicandClampy.position.set(200, 500);
        

        //const myMenu1: Menu = new Menu()

        //this.addChild(myMenu1)

    }
 
    
    update(deltaTime: number, _deltaFrame: number): void {
        const dt = deltaTime / 1000
        this.sonicandClampy.update(dt)
        if(Keyboard.state.get("KeyD")){
            this.sonicandClampy.speed.x = 250
            this.sonicandClampy.scale.x = 1
        }else if(Keyboard.state.get("KeyA")){
            this.sonicandClampy.speed.x = -250
            this.sonicandClampy.scale.x = -1
        } 

        if(this.sonicandClampy.y > this.suelo.y){ 
            this.sonicandClampy.y = this.suelo.y
            this.sonicandClampy.speed.y = 0
        }

        if((Keyboard.state.get("Space")) && (this.sonicandClampy.speed.y == 0)){

            this.sonicandClampy.speed.y = -650
            this.sonicandClampy.acceleration.y = 1200

        }

        //console.log(this.PhysSonic.speed.y)

        const overlap = checkCollision(this.sonicandClampy, this.plataforma1)
        if (overlap != null)
        {
            if (overlap.width < overlap.height)
            {
                if (this.sonicandClampy.x > this.plataforma1.x)
                {
                    this.sonicandClampy.x += overlap.width;
                }else if (this.sonicandClampy.x < this.plataforma1.x)
                {
                    this.sonicandClampy.x -= overlap.width
                }
            }else
            {
                if (this.sonicandClampy.y > this.plataforma1.y)
                {
                    this.sonicandClampy.y -= overlap.height;
                    this.sonicandClampy.speed.y = 0;
                }else if (this.sonicandClampy.y < this.plataforma1.y)
                {
                    this.sonicandClampy.y += overlap.height
                }
            }
        }
    }
;
};