import { GameState } from '../Types';

let ctx: CanvasRenderingContext2D, state: GameState;
let canvasWidth: number, canvasHeight: number;

const draw = () => {
    ctx.fillStyle = '#2f0606';

    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    for (let object of [state.bird, ...state.pipes]) {
        object.draw(ctx);
    }

    requestAnimationFrame(draw);
};

export default function beginDrawing(_ctx: CanvasRenderingContext2D,
    _state: GameState,
    _canvasWidth: number,
    _canvasHeight: number) {

    ctx = _ctx;
    state = _state;
    canvasWidth = _canvasWidth;
    canvasHeight = _canvasHeight;

    requestAnimationFrame(draw);
}