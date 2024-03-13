import { Sprite } from "core";
import { defaultCanvasHeight, defaultCanvasWidth } from "utils";

export class GameEngine {
  static _instance: GameEngine | undefined;
  _canvas!: HTMLCanvasElement;
  _animationRequestId: number | undefined;
  _background!: Sprite;

  get instance(): GameEngine | undefined {
    return GameEngine._instance;
  }

  set instance(value: GameEngine) {
    GameEngine._instance = value;
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  set canvas(value: HTMLCanvasElement) {
    this._canvas = value;
  }

  get animationRequestId(): number | undefined {
    return this._animationRequestId;
  }

  set animationRequestId(value: number) {
    this._animationRequestId = value;
  }

  get background(): Sprite {
    return this._background;
  }

  set background(value: Sprite) {
    this._background = value;
  }

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
    // console.log("DRAW");
    this.canvas.width = defaultCanvasWidth;
    this.canvas.height = defaultCanvasHeight;
    this.background = new Sprite({
      position: { x: 0, y: 0 },
      sprites: {
        idle: {
          imageSrc: "src/assets/img/background.jpg",
          flippedImageSrc: "src/assets/img/background.jpg",
          totalFrames: 4,
        },
      },
    });
  };

  public run = () => {
    // console.log("RUN");
    this._animationRequestId = requestAnimationFrame(this.run);
    this._background.update(this._canvas);
  };
}
