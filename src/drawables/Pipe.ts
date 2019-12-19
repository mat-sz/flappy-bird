import Matter from 'matter-js';
import { Drawable, Color } from '../Types';
import { boxWidth } from '../constants';

/**
 * Creates a new Drawable containing a pipe.
 * @param x 
 * @param y 
 * @param color
 * @param width 
 * @param height 
 */
export default function Pipe(x: number, y: number, width = 1, height = 1): Drawable {
    const totalWidth = boxWidth * width;
    const totalHeight = boxWidth * height;

    const body = Matter.Bodies.rectangle(x + totalWidth / 2, y + totalHeight / 2, totalWidth, totalHeight, { mass: Infinity, inertia: Infinity });
    
    body.isStatic = true;
    body.restitution = 1;

    const draw = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = "#3c3c45";
        ctx.fillRect(body.position.x - totalWidth / 2, body.position.y - totalHeight / 2, totalWidth, totalHeight);
    }

    return {
        body,
        draw,
    };
}