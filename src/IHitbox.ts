import { Rectangle } from "pixi.js";

export interface IHitbox {
    getHitbox(): Rectangle
}

export function checkCollision(objA:IHitbox, objB:IHitbox):Rectangle | null
{
    const rA = objA.getHitbox();
    const rB = objB.getHitbox();

    const rightmostLeft = rA.left < rB.left ? rB.left : rA.left
    const leftmostRight = rA.right > rB.right ? rB.right : rA.right
    const bottonmostTop = rA.top < rB.top ? rB.top : rA.top
    const topmostBottom = rA.bottom > rB.bottom ? rB.bottom : rA.bottom
    
    const makesSenseHorizontal = rightmostLeft < leftmostRight;
    const makesSenseVertical = bottonmostTop < topmostBottom;
    if(makesSenseHorizontal && makesSenseVertical)
    {
        const retval = new Rectangle();
        retval.x = rightmostLeft;
        retval.y = bottonmostTop;
        retval.width = leftmostRight - rightmostLeft;
        retval.height = topmostBottom - bottonmostTop;
        return retval
    }else
    {
        return null;
    }
}