import { Container, Graphics, Rectangle, Sprite, Texture } from "pixi.js";
import { IHitbox } from "./IHitbox";

export class Platform extends Container implements IHitbox{
    private texplataforma: Texture = Texture.from("plataforma");
    private plataforma: Sprite = new Sprite(this.texplataforma);
    hitbox: Graphics;
    constructor(){
        super()
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x00FFFF, 0.3);
        this.hitbox.drawRect(0,0,300,100);
        this.hitbox.endFill();
        

        this.addChild(this.plataforma);
        this.addChild(this.hitbox);

    }
    getHitbox(): Rectangle {
       return this.hitbox.getBounds() ;
    }


}
