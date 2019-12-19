import Matter from 'matter-js';

export interface Drawable {
    draw: (ctx: CanvasRenderingContext2D) => void,
    body: Matter.Body,
};

export interface GameState {
    bird: Drawable,
    pipes: Drawable[],
};