import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { Tween } from "tweedle.js";
import { IHitbox } from "./IHitbox";

export class EnemigoComun extends Container implements IHitbox{
    private enemigo: Sprite;
    private movementTween: Tween<EnemigoComun>;
    private hitbox: Graphics;
    private auxZero = new Graphics();
    private initialX: number;

    constructor() {
        super();
        this.initialX = 0
        this.movementTween = new Tween(this)
        this.enemigo = Sprite.from("Enemigo");
        this.enemigo.anchor.set(0.5,1)
        

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.3);
        this.hitbox.drawRect(-75,-100,150,100); 
        this.hitbox.endFill(); 

        this.auxZero.beginFill(0xFF00FF);
        this.auxZero.drawCircle(0,0,10);
        this.auxZero.endFill();

        this.addChild(this.enemigo, this.hitbox, this.auxZero);

        
            
    }

    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }


    updateDirection() {
        if (this.x < this.initialX) {
            this.enemigo.scale.x = -Math.abs(this.enemigo.scale.x); // Mirar hacia la derecha
        } else {
            this.enemigo.scale.x = Math.abs(this.enemigo.scale.x); // Mirar hacia la izquierda
        }
        
    }

    initializeMovement() {
        this.initialX = this.x
        this.movementTween = new Tween(this).to({ x: this.x - 150}, 1400)
            .onRepeat(() => {
                this.updateDirection(); // Flip sprite direction
            })
            .yoyo(true)
            .repeat(Infinity)
            .start();
        
    }

    stopEnemyMovement() {
        this.movementTween.pause();
    }
}