import { Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./utills/PhysicsContainer";



export class SonicClampy extends PhysicsContainer implements IHitbox{

    private sonic = Sprite.from("Sonic");
    private clampy = Sprite.from("Clampy");
    private hitbox: Graphics;
    private auxZero = new Graphics();
    constructor(){
        super();

        this.sonic.scale.set(0.5, 0.5);
        this.sonic.anchor.set(0.53,0.93);
        this.clampy.scale.set(0.15, 0.15);
        this.clampy.anchor.set(2,3.7);
        this.clampy.position.set(110,150);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.3);
        this.hitbox.drawRect(0,0,150,210); 
        this.hitbox.endFill();
        this.hitbox.position.set(-95,-210); 

        this.auxZero.beginFill(0xFF00FF);
        this.auxZero.drawCircle(0,0,10);
        this.auxZero.endFill();

        this.addChild(this.sonic, this.clampy, this.hitbox, this.auxZero)
    }
    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }
    
}