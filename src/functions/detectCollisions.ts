import Matter from 'matter-js';
import { GameState } from '../Types';

let engine: Matter.Engine;
let state: GameState;
let defeatConditionTriggered: () => void;

const collisionEvent = (event: Matter.IEventCollision<Matter.Engine>) => {
    const pairs = event.pairs;

    for (let pair of pairs) {
        const bird = state.bird;

        // The only collisions that will currently happen are between the bird and a pipe,
        // but I plan on adding some other elements eventually.
        if (pair.bodyA === bird.body || pair.bodyB === bird.body) {
            const thePipe = state.pipes.find((pipe) => pair.bodyA === pipe.body || pair.bodyB === pipe.body);

            if (thePipe) {
                defeatConditionTriggered();
            }
        }
    }
};

export default function detectCollisions(_engine: Matter.Engine,
    _state: GameState,
    _defeatConditionTriggered: () => void) {

    engine = _engine;
    state = _state;
    defeatConditionTriggered = _defeatConditionTriggered;
    Matter.Events.on(engine, 'collisionStart', collisionEvent);
}