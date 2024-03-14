import { Sprite } from "core";
import { defaultCanvasHeight, defaultCanvasWidth } from "utils";

export class GameEngine {
  static _instance: GameEngine | undefined;
  _canvas!: HTMLCanvasElement;
  _animationRequestId: number | undefined;
  _background!: Sprite;

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
  };

  private run = () => {
    // console.log("RUN");
    this._animationRequestId = requestAnimationFrame(this.run);
    this._background.update(this._canvas);
  };
}
