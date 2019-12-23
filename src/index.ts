import Matter from 'matter-js';
import "./App.scss";

import enableInput from './functions/enableInput';
import beginDrawing from './functions/beginDrawing';

import { GameState } from './Types';
import Bird from './drawables/Bird';
import Pipe from './drawables/Pipe';
import { boxWidth } from './constants';
import detectCollisions from './functions/detectCollisions';

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
    gameState.pipes = [];
    pipeSpawning = 0;
    Matter.World.add(world, gameState.bird.body);
};

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

setInterval(() => {
    // Check if our bird's altitude is within the limits.
    const y = gameState.bird.body.position.y;

    if (y > canvas.height * 1.2 || y < canvas.height * -0.2) {
        reset();
    }
}, 50);

let pipeSpawning = 0;
setInterval(() => {
    pipeSpawning++;

    for (let pipe of gameState.pipes) {
        const pos = pipe.body.position;

        Matter.Body.setPosition(pipe.body, {
            x: pos.x - 7.5,
            y: pos.y,
        });
    }

    if (pipeSpawning == 90) {
        pipeSpawning = 0;

        const top = rand(0, 2);
        let y = top ? 0 : canvas.height/2;
        let height = rand(6, 11);
        
        if (!top) {
            y -= (height - 10) * boxWidth;
        }

        const pipe = Pipe(canvas.width - boxWidth, y, 3, height);
        gameState.pipes.push(pipe);
        Matter.World.add(world, pipe.body);
    }
}, 16.667);

reset();

engine.world.gravity.x = 0;
engine.world.gravity.y = 1.5;
Matter.Runner.run(runner, engine);

beginDrawing(ctx, gameState, canvas.width, canvas.height);

enableInput(canvas, () => {
    Matter.Body.applyForce(gameState.bird.body, gameState.bird.body.position, { x: 0, y: -0.03 });
});

detectCollisions(engine, gameState, () => {
    reset();
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