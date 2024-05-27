import { Container, Graphics, Rectangle, Sprite} from "pixi.js";
import { IHitbox } from "./IHitbox";

export class Pinchos extends Container implements IHitbox{
    private Pinchos: Sprite;
    hitbox: Graphics;
    constructor(){
        super()
        this.Pinchos = Sprite.from("Pinchos")
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x00FFFF, 0.3);
        this.hitbox.drawRect(0,0,200,50);
        this.hitbox.endFill();
        

        this.addChild(this.Pinchos);
        this.addChild(this.hitbox);

    }

    getHitbox(): Rectangle {
       return this.hitbox.getBounds() ;
    }
}