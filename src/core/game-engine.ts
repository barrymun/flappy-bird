import { Pipe, Player, Sprite } from "core";
import {
  PipeData,
  defaultCanvasHeight,
  defaultCanvasWidth,
  generateRandomPipeOffset,
  pipeScale,
  playerScale,
} from "utils";

export class GameEngine {
  private static _instance: GameEngine | undefined;
  private static _canvas: HTMLCanvasElement;
  _pipeImg: HTMLImageElement | undefined;
  _animationRequestId: number | undefined;
  _background!: Sprite;
  _pipeGroups!: [Pipe[], Pipe[]];
  _player!: Player;

  static get instance() {
    return GameEngine._instance!;
  }

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

    this.setup = this.setup.bind(this);
    this.run = this.run.bind(this);
    this.draw = this.draw.bind(this);
    this.getPipeData = this.getPipeData.bind(this);
    this.detectCollision = this.detectCollision.bind(this);

    GameEngine._instance = this;
    GameEngine._canvas = canvas;
    this.setup();
  }

  private async setup() {
    const image = new Image();
    image.src = "src/assets/img/pipe.png";
    image.onload = () => {
      this._pipeImg = image;
      this.draw();
      this.run();
    };
  }

  public getPipeData(): PipeData {
    const pipeWidth = this.pipeImg.naturalWidth;
    const pipeHeight = this.pipeImg.naturalHeight;
    const pipeGap = pipeHeight / 4;
    const min = pipeHeight / 3;
    const max = pipeHeight - pipeHeight / 3;
    return { pipeHeight, pipeGap, pipeWidth, min, max };
  }

  private draw() {
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

    this._player = new Player({
      position: { x: GameEngine._canvas.width / 2, y: GameEngine._canvas.height / 2 },
      sprites: {
        idle: {
          imageSrc: "src/assets/img/bird.png",
          totalFrames: 3,
        },
      },
      scale: playerScale,
    });
  }

  private detectCollision(pipe: Pipe) {
    const player = this._player;
    const playerRect = {
      x: player.position.x,
      y: player.position.y,
      width: (player._image.width * playerScale) / player._sprites.idle.totalFrames,
      height: player._image.height * playerScale,
    };
    const pipeRect = {
      x: pipe.position.x,
      y: pipe.position.y,
      width: pipe._image.width * pipeScale,
      height: pipe._image.height * pipeScale,
    };

    // debugging
    // GameEngine._canvas.getContext("2d")!.strokeRect(playerRect.x, playerRect.y, playerRect.width, playerRect.height);
    // GameEngine._canvas.getContext("2d")!.strokeRect(pipeRect.x, pipeRect.y, pipeRect.width, pipeRect.height);

    if (
      playerRect.x < pipeRect.x + pipeRect.width &&
      playerRect.x + playerRect.width > pipeRect.x &&
      playerRect.y < pipeRect.y + pipeRect.height &&
      playerRect.y + playerRect.height > pipeRect.y
    ) {
      console.log("collision detected");
    }
  }

  private run() {
    this._animationRequestId = requestAnimationFrame(this.run);
    this._background.update();
    this._pipeGroups.forEach((pipeGroup) => {
      const { min, max } = this.getPipeData();
      const newPosition = generateRandomPipeOffset(min, max);
      pipeGroup.forEach((pipe, index) => {
        this.detectCollision(pipe);
        pipe.update({ isBottomPipe: index === 0, newPosition });
      });
    });
    this._player.update();
  }
}
