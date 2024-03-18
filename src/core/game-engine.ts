import { Pipe, Sprite } from "core";
import {
  PipeData,
  defaultCanvasHeight,
  defaultCanvasWidth,
  generateRandomPipeOffset,
  pipeMovementSpeed,
  pipeScale,
} from "utils";

export class GameEngine {
  private static _instance: GameEngine | undefined;
  private static _canvas: HTMLCanvasElement;
  _pipeImg: HTMLImageElement | undefined;
  _animationRequestId: number | undefined;
  _background!: Sprite;
  _pipeGroups!: [Pipe[], Pipe[]];

  // static get instance() {
  //   return GameEngine._instance!;
  // }

  static get canvas() {
    return GameEngine._canvas;
  }

  get pipeImg() {
    return this._pipeImg!;
  }

  // public get pipes() {
  //   return this._pipes;
  // }

  // public set pipes(pipes: Pipe[]) {
  //   this._pipes = pipes;
  // }

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

  private getPipeData = (): PipeData => {
    const pipeWidth = this.pipeImg.naturalWidth;
    const pipeHeight = this.pipeImg.naturalHeight;
    const pipeGap = pipeHeight / 4;
    const min = pipeHeight / 3;
    const max = pipeHeight - pipeHeight / 3;
    return { pipeHeight, pipeGap, pipeWidth, min, max };
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

    const { pipeHeight, pipeGap, pipeWidth, min, max } = this.getPipeData();
    const firstPipeX = GameEngine._canvas.width;
    const secondPipeX = GameEngine._canvas.width + GameEngine._canvas.width / 2 + (pipeWidth * pipeScale) / 2;
    const firstPipeOffset = generateRandomPipeOffset(min, max);
    const secondPipeOffset = generateRandomPipeOffset(min, max);
    this._pipeGroups = [
      [
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
          position: { x: firstPipeX, y: firstPipeOffset - pipeGap - pipeHeight * pipeScale },
          sprites: {
            idle: {
              imageSrc: "src/assets/img/pipe.png",
            },
          },
          scale: pipeScale,
          shouldInvert: true,
        }),
      ],
      [
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
          position: { x: secondPipeX, y: secondPipeOffset - pipeGap - pipeHeight * pipeScale },
          sprites: {
            idle: {
              imageSrc: "src/assets/img/pipe.png",
            },
          },
          scale: pipeScale,
          shouldInvert: true,
        }),
      ],
    ];
  };

  private run = () => {
    this._animationRequestId = requestAnimationFrame(this.run);
    this._background.update();
    this._pipeGroups.forEach((pipeGroup) => {
      const { min, max, pipeGap, pipeHeight } = this.getPipeData();
      const newPosition = generateRandomPipeOffset(min, max);
      pipeGroup.forEach((pipe, index) => {
        if (pipe.position.x < -pipe._image.width * pipe._scale) {
          if (index === 0) {
            pipe.position.y = newPosition;
          } else {
            pipe.position.y = newPosition - pipeGap - pipeHeight * pipeScale;
          }
          // reset the pipe to the right side of the canvas
          pipe.position.x = GameEngine.canvas.width;
        } else {
          pipe.position.x -= pipeMovementSpeed;
        }
        pipe.update();
      });
    });
  };
}
