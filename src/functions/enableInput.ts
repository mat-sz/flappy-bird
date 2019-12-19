let onJump: () => void = null;

const mouseDown = (e: MouseEvent) => {
    onJump();
};

const touchStart = (e: TouchEvent) => {
    onJump();
};

export default function enableInput(canvas: HTMLCanvasElement, _onJump: () => void) {
    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('touchstart', touchStart);

    onJump = _onJump;
}