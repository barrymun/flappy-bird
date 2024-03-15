import { Pipe, Sprite } from "core";
import { defaultCanvasHeight, defaultCanvasWidth, generateRandomPipeOffset, pipeScale } from "utils";

// TODO: clean this up
const image = new Image();
image.src = "src/assets/img/pipe.png";
const pipeWidth = image.naturalWidth;
const pipeHeight = image.naturalHeight;
const pipeGap = pipeHeight / 4;
console.log(pipeWidth, pipeHeight, pipeGap);

export class GameEngine {
  static _instance: GameEngine | undefined;
  _canvas!: HTMLCanvasElement;
  _animationRequestId: number | undefined;
  _background!: Sprite;
  _pipes!: Pipe[];

  constructor(canvas: HTMLCanvasElement) {
    if (GameEngine._instance) {
      return;
    }
    GameEngine._instance = this;
    this._canvas = canvas;
    this.draw();
    this.run();
  }

  private draw = () => {
    this._canvas.width = defaultCanvasWidth;
    this._canvas.height = defaultCanvasHeight;
    this._background = new Sprite({
      position: { x: 0, y: 0 },
      sprites: {
        idle: {
          imageSrc: "src/assets/img/background.png",
        },
      },
    });
    const firstPipeX = this._canvas.width;
    const secondPipeX = this._canvas.width + this._canvas.width / 2 + (pipeWidth * pipeScale) / 2;
    const firstPipeOffset = generateRandomPipeOffset(0 + pipeHeight / 4, pipeHeight - pipeHeight / 4);
    const secondPipeOffset = generateRandomPipeOffset(0 + pipeHeight / 4, pipeHeight - pipeHeight / 4);
    this._pipes = [
      // first pipe bottom
      new Pipe({
        position: { x: firstPipeX, y: firstPipeOffset },
        sprites: {
          idle: {
            imageSrc: "src/assets/img/pipe.png",
          },
        },
        scale: pipeScale,
      }),
      // first pipe top
      new Pipe({
        position: { x: firstPipeX, y: firstPipeOffset - pipeHeight * pipeScale - pipeGap },
        sprites: {
          idle: {
            imageSrc: "src/assets/img/pipe.png",
          },
        },
        scale: pipeScale,
        shouldInvert: true,
      }),
      // second pipe bottom
      new Pipe({
        position: { x: secondPipeX, y: secondPipeOffset },
        sprites: {
          idle: {
            imageSrc: "src/assets/img/pipe.png",
          },
        },
        scale: pipeScale,
      }),
      // second pipe top
      new Pipe({
        position: { x: secondPipeX, y: secondPipeOffset - pipeHeight * pipeScale - pipeGap },
        sprites: {
          idle: {
            imageSrc: "src/assets/img/pipe.png",
          },
        },
        scale: pipeScale,
        shouldInvert: true,
      }),
    ];
  };

  private run = () => {
    this._animationRequestId = requestAnimationFrame(this.run);
    this._background.update(this._canvas);
    this._pipes.forEach((pipe) => pipe.update(this._canvas));
  };
}
