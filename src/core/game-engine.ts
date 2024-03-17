import { Pipe, Sprite } from "core";
import { defaultCanvasHeight, defaultCanvasWidth, generateRandomPipeOffset, pipeScale } from "utils";

export class GameEngine {
  private static _instance: GameEngine | undefined;
  private static _canvas: HTMLCanvasElement;
  _pipeImg: HTMLImageElement | undefined;
  _animationRequestId: number | undefined;
  _background!: Sprite;
  _pipes!: Pipe[];

  static get canvas() {
    return GameEngine._canvas;
  }

  get pipeImg() {
    return this._pipeImg!;
  }

  constructor(canvas: HTMLCanvasElement) {
    if (GameEngine._instance) {
      return;
    }
    GameEngine._instance = this;
    GameEngine._canvas = canvas;
    this.setup();
  }

  private setup = async () => {
    const image = new Image();
    image.src = "src/assets/img/pipe.png";
    image.onload = () => {
      this._pipeImg = image;
      this.draw();
      this.run();
    };
  };

  private draw = () => {
    GameEngine._canvas.width = defaultCanvasWidth;
    GameEngine._canvas.height = defaultCanvasHeight;
    this._background = new Sprite({
      position: { x: 0, y: 0 },
      sprites: {
        idle: {
          imageSrc: "src/assets/img/background.png",
        },
      },
    });

    const pipeWidth = this.pipeImg.naturalWidth;
    const pipeHeight = this.pipeImg.naturalHeight;
    const pipeGap = pipeHeight / 4;
    const firstPipeX = GameEngine._canvas.width;
    const secondPipeX = GameEngine._canvas.width + GameEngine._canvas.width / 2 + (pipeWidth * pipeScale) / 2;
    const min = 0 + pipeHeight / 4;
    const max = pipeHeight - pipeHeight / 4;
    const firstPipeOffset = generateRandomPipeOffset(min, max);
    const secondPipeOffset = generateRandomPipeOffset(min, max);
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
    this._background.update();
    this._pipes.forEach((pipe) => pipe.update());
  };
}
