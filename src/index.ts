import Matter from 'matter-js';
import "./App.scss";

import enableInput from './functions/enableInput';
import beginDrawing from './functions/beginDrawing';

import { GameState } from './Types';
import Bird from './drawables/Bird';

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
const engine = Matter.Engine.create();
const runner = Matter.Runner.create({});
const world = engine.world;
const gameState: GameState = {
    bird: null,
    pipes: [],
};

const reset = () => {
    Matter.World.clear(world, false);
    gameState.bird = Bird(canvas.width/2, canvas.height/2);
    Matter.World.add(world, gameState.bird.body);
}

reset();

engine.world.gravity.x = 0;
engine.world.gravity.y = 0.5;
Matter.Runner.run(runner, engine);

beginDrawing(ctx, gameState, canvas.width, canvas.height);

enableInput(canvas, () => {
    Matter.Body.applyForce(gameState.bird.body, gameState.bird.body.position, { x: 0, y: -0.01 });
});

document.addEventListener('gesturestart', (e) => {
    // Disable zoom on mobile Safari.
    e.preventDefault();
});

if (process.env.NODE_ENV === 'development') {
    document.getElementById("canvases").style.display = 'flex';
    
    // Debug mode.
    let render = Matter.Render.create({
        element: document.getElementById('debug'),
        engine: engine,
        options: {
            height: 800
        }
    });
    
    Matter.Render.run(render);
}