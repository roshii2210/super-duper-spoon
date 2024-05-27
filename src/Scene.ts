import { Container, Sprite, Texture} from "pixi.js";
import { Player } from "./Player";
import { IUpdateable } from "./IUpdateable";
import { Platform } from "./Platform";
import { checkCollision } from "./IHitbox";
import { PajaroEnemigo } from "./PajaroEnemigo";
import { EnemigoComun } from "./EnemigoComun";
import { Pinchos } from "./Pinchos";


export class Scene extends Container implements IUpdateable{

    private sonicandClampy: Player
    private texturaSuelo: Texture
    private suelo: Sprite
    private plataforma1: Platform;
    private world: Container;
    private pajaroEnemigo: PajaroEnemigo
    private enemigoComun: EnemigoComun
    private pajaroEnemigo1: PajaroEnemigo;
    private plataforma2: Platform;
    private pinchos1: Pinchos;



    constructor(){
        super();
        this.pinchos1 = new Pinchos
        this.pinchos1.position.set(2500,450)

        this.sonicandClampy = new Player()

        this.texturaSuelo = Texture.from("Suelo")
        this.suelo = new Sprite(this.texturaSuelo)
        this.suelo.y = 500;

        this.pajaroEnemigo = new PajaroEnemigo()
        this.pajaroEnemigo.position.set(2000, 0);

        this.pajaroEnemigo1 = new PajaroEnemigo()
        this.pajaroEnemigo1.position.set(3000, 0);

        this.enemigoComun = new EnemigoComun()
        this.enemigoComun.position.set(800, 500)

        this.world = new Container;

        this.plataforma1 = new Platform();
        this.plataforma1.scale.set(1,0.7);
        this.plataforma1.position.set(300, 350);

        this.plataforma2 = new Platform();
        this.plataforma2.scale.set(1,0.7);
        this.plataforma2.position.set(1500, 350);

	    this.world.addChild(this.suelo, this.plataforma1,
             this.plataforma2, this.pinchos1, this.sonicandClampy, this.pajaroEnemigo,
              this.pajaroEnemigo1, this.enemigoComun);
        this.addChild(this.world);
   
        this.sonicandClampy.position.set(200, 500);
        this.enemigoComun.initializeMovement()
        this.pajaroEnemigo.initializeMovement();
        this.plataforma2.movement();

    }

    update(deltaTime: number, _deltaFrame: number): void {
        this.sonicandClampy.update(deltaTime)

        if(this.sonicandClampy.y > this.suelo.y){
            this.sonicandClampy.canJump = true
            this.sonicandClampy.y = this.suelo.y
            this.sonicandClampy.acceleration.y = 0
        }


        this.handleOneWayCollision(this.sonicandClampy, this.plataforma1)
        this.handleOneWayCollision(this.sonicandClampy, this.plataforma2)

        this.world.x = -this.sonicandClampy.x * this.worldTransform.a + 455;

        
       if(checkCollision(this.sonicandClampy, this.pajaroEnemigo)){
            console.log("good good")
       }

       this.pajaroEnemigo1.update(deltaTime, this.sonicandClampy.x)
    }

    handleOneWayCollision(player: Player, platform: Platform) {
        const collision = checkCollision(player, platform);
        const playerBottom = player.getHitbox().bottom;
        const platformTop = platform.getHitbox().top;
        const gravity = 1200

        if (collision)
        {
            // Verifica si el jugador viene desde arriba
            if (player.speed.y > 0 && playerBottom - player.speed.y <= platformTop)
            {
                this.sonicandClampy.y -= collision.height // Coloca al jugador justo encima de la plataforma
                this.sonicandClampy.acceleration.y = 0; // Detiene la velocidad vertical
                this.sonicandClampy.speed.y = 0;
                this.sonicandClampy.canJump = true

                if (player.y > platform.y)
                {
                    player.y += collision.height
                    player.speed.y = gravity / 2;
                }
            }
        }else if (playerBottom == platformTop && !collision) {
           // Permitir que el jugador caiga cuando no hay colisión
            player.acceleration.y = gravity;
            if(this.sonicandClampy.y >= this.suelo.y)
            {
                player.acceleration.y = 0
            }
        }

        if(checkCollision(this.sonicandClampy, this.pinchos1)){
            console.log("game over")
        }

    }

}