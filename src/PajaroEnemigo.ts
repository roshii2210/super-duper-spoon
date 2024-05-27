import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { Tween } from "tweedle.js";
import { IHitbox } from "./IHitbox";
import { IUpdateable } from "./IUpdateable";

export class PajaroEnemigo extends Container implements IHitbox, IUpdateable{
    private enemigo: Sprite;
    private balas: Sprite;
    private movementTween: Tween<PajaroEnemigo>;
    private hitbox: Graphics;
    private initialX: number;
    private velocityY: number;
    private accelerationY: number;
    private rolling: boolean;
    private piedra: Sprite;


    constructor() {
        super();

        this.initialX = 0

        this.piedra = Sprite.from("Piedra")
        this.piedra.anchor.set(0.5,0.5)

        this.enemigo = Sprite.from("Enemigo");
        this.enemigo.anchor.set(0.5,0)
        this.balas = Sprite.from("Balas");
        this.balas.anchor.set(-2,0)
        
        this.movementTween = new Tween(this)

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.3);
        this.hitbox.drawRect(25, -15, 50, 50); 
        this.hitbox.endFill();

        this.velocityY = 0;
        this.accelerationY = 0.002; // Gravedad
        this.rolling = false;
        this.addChild(this.enemigo);
    }

    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

    initializeMovement() {
        this.startRandomMovement();
        this.startShooting();
    }

    updateDirection() {
        if (this.x < this.initialX) {
            this.enemigo.scale.x = -Math.abs(this.enemigo.scale.x); // Mirar hacia la derecha
        } else {
            this.enemigo.scale.x = Math.abs(this.enemigo.scale.x); // Mirar hacia la izquierda
        }
        
    }

    startRandomMovement() {
        this.initialX = this.x
        const minX = 1000;
        const maxX = 2000;
        const randomX = function random() {
            return Math.floor((Math.random() * (maxX - minX + 1)) + minX);
        }
        //const duration = Math.random() * 2000 + 1000;
        
        this.movementTween.to({ x: randomX() }, 2000)
        .onRepeat(() => {
            this.updateDirection();
            this.startRandomMovement();
        })
        .repeat(Infinity)
        .yoyo(true).start();
    }

    startShooting() {
        setInterval(() => {
            const bullet = this.balas;
            bullet.position.set(this.enemigo.x, this.enemigo.y);
            this.addChild(bullet);
            bullet.addChild(this.hitbox)

            new Tween(bullet)
                .to({ x: 0, y: 800 }, 2000) // Ajusta el valor de y según la altura de tu escena
                .onComplete(() => {
                    this.parent.removeChild(bullet); // Elimina la bala después de alcanzar su destino
                })
                .start();
        }, 3000); // Dispara cada 1 segundo
    }

    update(deltaTime: number, posicion:number) {
        this.addChild(this.piedra)
        if (!this.rolling) {
            // Suponiendo que tienes una referencia al jugador
            const playerX = posicion
            if (playerX >= 3000) {
                this.rolling = true;
            }
        } else {
            // Aplicar gravedad
            this.velocityY += this.accelerationY * deltaTime;
            this.piedra.y += this.velocityY * deltaTime;

            // Verificar si la piedra ha alcanzado el suelo
            const groundY = 400; // Ajusta esto según la posición de tu suelo
            if (this.piedra.y >= groundY) {
                this.piedra.y = groundY;
                this.velocityY = 0
                this.startRolling();
            }
        }
    }

    startRolling() {
        // Simulación de rodamiento con un tween
        new Tween(this.piedra)
            .to({ x: 1000 }, 3000) // Ajusta la distancia y duración del rodamiento
            .onUpdate(() => {
                this.piedra.rotation += 0.0015; // Ajusta la velocidad de rotación
            }).onComplete(()=>{
                this.piedra.visible = false
            })
            .start();
    }
}
