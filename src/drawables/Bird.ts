import Matter from 'matter-js';
import { Drawable } from '../Types';

const radius = 15;

/**
 * Creates a new Drawable containing a bird.
 * @param x 
 * @param y 
 * @param radius 
 */
export default function Bird(x: number, y: number): Drawable {
    const body = Matter.Bodies.circle(x, y, radius, { inertia: Infinity, mass: 1 });

    const draw = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(body.position.x, body.position.y, radius, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    return {
        body,
        draw,
    };
}