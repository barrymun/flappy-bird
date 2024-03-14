import { Pipe, Sprite } from "core";
import { defaultCanvasHeight, defaultCanvasWidth, pipeScale, pipeWidth } from "utils";

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
    this._pipes = [
      // first pipe bottom
      new Pipe({
        position: { x: firstPipeX, y: 220 },
        sprites: {
          idle: {
            imageSrc: "src/assets/img/pipe.png",
          },
        },
        scale: pipeScale,
      }),
      // first pipe top
      new Pipe({
        position: { x: firstPipeX, y: 100 },
        sprites: {
          idle: {
            imageSrc: "src/assets/img/pipe.png",
          },
        },
        scale: pipeScale,
      }),
      // second pipe bottom
      new Pipe({
        position: { x: secondPipeX, y: 220 },
        sprites: {
          idle: {
            imageSrc: "src/assets/img/pipe.png",
          },
        },
        scale: pipeScale,
      }),
      // second pipe top
      new Pipe({
        position: { x: secondPipeX, y: 320 },
        sprites: {
          idle: {
            imageSrc: "src/assets/img/pipe.png",
          },
        },
        scale: pipeScale,
      }),
    ];
  };

  private run = () => {
    this._animationRequestId = requestAnimationFrame(this.run);
    this._background.update(this._canvas);
    this._pipes.forEach((pipe) => pipe.update(this._canvas));
  };
}
