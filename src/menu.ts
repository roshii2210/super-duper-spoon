import { Container, Sprite, Texture, Text } from "pixi.js";
import { Button } from "./Ui/Button";
import { Keyboard } from "./utills/Keyboard";

export class Menu extends Container{

    private mouseButton:Button;
    private lastKeyPressed

    constructor(){
        super();
        
        const dialog: Container = new Container();
        dialog.x = 500;
        dialog.y = 200;

        const elmenu = Sprite.from("Menus")
        dialog.addChild(elmenu)

        this.mouseButton = new Button(
            Texture.from("BotonMouse"),
            Texture.from("BotonMousePress"), 
            Texture.from("BotonMouseSelect")
        )
        this.mouseButton.on("buttonClick", this.onButtonClick, this)
        

        this.mouseButton.cursor = "pointer";
        
        const touchButton = Sprite.from("BotonTouch")
        touchButton.x = 50;
        touchButton.y = 170;
        
        const mouseTouch = Sprite.from("BotonAmbos")
        mouseTouch.x = 50;
        mouseTouch.y = 290;

        this.lastKeyPressed = new Text("Waiting...", {fontSize: 48})
        this.lastKeyPressed.anchor.set(0.5);
        this.lastKeyPressed.x = dialog.width / 2 + 60;
        this.lastKeyPressed.y = touchButton.y + 30;

       document.addEventListener("keydown", this.onKeyDown.bind(this))
       
    
        dialog.addChild(this.mouseButton)
        dialog.addChild(touchButton)
        dialog.addChild(mouseTouch)
        dialog.addChild(this.lastKeyPressed)

        this.addChild(dialog)

        Keyboard.down.on("KeyB", this.onKeyB, this)


    }
    private onKeyB() : void{
        console.log("aprete la b", this)
    }

    private onButtonClick():void{
        console.log("new button click");
    }

    private onKeyDown(e:KeyboardEvent):void{
        this.lastKeyPressed.text = e.code;
    }




}