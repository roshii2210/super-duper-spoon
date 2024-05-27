import { IHitbox } from "./IHitbox";
import { Graphics, Rectangle, Sprite} from "pixi.js";
import { Tween } from "tweedle.js";
import { PhysicsContainer } from "./utills/PhysicsContainer";

export class Enemy extends PhysicsContainer implements IHitbox
{
    
    Sprite: Sprite;
    private hitbox: Graphics
    auxZero: Graphics;
    private isEnemyShooting: boolean = false;
    private a: Tween<Enemy>;
    private initialX: number;
    Balas: Sprite = Sprite.from("Balas");

    constructor(){
        super()
        this.Sprite = Sprite.from("Enemigo")
        this.Sprite.anchor.set(0.53, 0.93)
        this.Sprite.scale.set(1.5,1.5)
        this.initialX = 0
        this.a = new Tween(this)

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.3);
        this.hitbox.drawRect(-460, -170, 900, 185); 
        this.hitbox.endFill();

        this.auxZero = new Graphics
        this.auxZero.beginFill(0xFF00FF);
        this.auxZero.drawCircle(0,15,10);
        this.auxZero.endFill();
        this.Balas.visible = false;
        this.addChild(this.Sprite, this.Balas)
        this.addChild(this.hitbox, this.auxZero)
        
    }

    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

    updateDirection() {
        if (!this.isEnemyShooting) {
            if (this.x < this.initialX) {
                this.Sprite.scale.x = -Math.abs(this.Sprite.scale.x); // Mirar hacia la derecha
            } else {
                this.Sprite.scale.x = Math.abs(this.Sprite.scale.x); // Mirar hacia la izquierda
            }
        }
    }

    initializeMovement() {
        this.initialX = this.x
        this.a = new Tween(this).to({ x: this.x - 150}, 1400)
            .onRepeat(() => {
                this.updateDirection(); // Flip sprite direction
            })
            .yoyo(true)
            .repeat(Infinity)
            .start();
        
    }

    stopEnemyMovement() {
        this.a.pause();
    }

    startEnemyMovement() {
        this.a.resume();
    }

    shootAnimation() {
        this.Balas.visible = true; // Hacer visible la bala
        this.Balas.position.set(this.Sprite.scale.x > 0 ? this.Sprite.x-80 : this.Sprite.x+80 , this.y-600); // Colocar la bala en la posición del enemigo

        const shotTween = new Tween(this.Balas)
            .to({ x: this.Balas.x + (this.Sprite.scale.x > 0 ? -300 : 300) }, 1000) // Mover la bala a la izquierda o derecha
            .start();

        shotTween.onComplete(() => {
            this.Balas.visible = false; // Ocultar la bala al completar el disparo
            this.Balas.position.set(this.x, this.y); // Reiniciar la posición de la bala
            this.isEnemyShooting = false;
            this.startEnemyMovement(); // Reanudar el movimiento después del disparo
        });
    }

    lookAt(playerX: number) {
        // Adjust scale.x to make the enemy look at the player
        if (playerX < this.x) {
            this.Sprite.scale.x = Math.abs(this.Sprite.scale.x);
        } else {
            this.Sprite.scale.x = -Math.abs(this.Sprite.scale.x);
        }
    }


    updateState(isColliding: boolean, playerX: number) {
        if (isColliding && !this.isEnemyShooting) {
            this.isEnemyShooting = true;
            this.stopEnemyMovement();
            this.shootAnimation();
            this.lookAt(playerX)
        } else if (!isColliding && this.isEnemyShooting) {
            this.isEnemyShooting = false;
            this.startEnemyMovement();
            this.updateDirection()
        }else if(isColliding)
        {
            this.lookAt(playerX)
        }
    }

}