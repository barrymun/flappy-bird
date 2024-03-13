import { Coords, SpriteAnimation, SpriteImageAttribute, SpriteImageElement } from "utils";

interface SpriteProps {
  position: Coords;
  sprites: SpriteImageAttribute;
  scale?: number;
  totalFrames?: number;
  heldFrames?: number;
  offset?: Coords;
  shouldFlip?: boolean;
}

export class Sprite {
  _position: Coords;
  _sprites: SpriteImageElement;
  _image: HTMLImageElement;
  _scale: number = 1;
  _totalFrames: number = 1;
  _heldFrames: number = 5;
  _offset: Coords = { x: 0, y: 0 };
  _shouldFlip: boolean = false;
  _currentFrame: number = 0;
  _elapsedFrames: number = 0;

  constructor({ position, sprites, scale, totalFrames, heldFrames, offset, shouldFlip }: SpriteProps) {
    this._position = position;
    this._sprites = Object.keys(sprites).reduce((previous, key) => {
      const k = key as SpriteAnimation;
      const image = new Image();
      image.src = sprites[k].imageSrc;
      const flippedImage = new Image();
      flippedImage.src = sprites[k].flippedImageSrc;
      return {
        ...previous,
        [key]: {
          image,
          flippedImage,
          totalFrames: sprites[k].totalFrames,
        },
      };
    }, {} as SpriteImageElement);
    this._image = this._sprites.idle[shouldFlip ? "flippedImage" : "image"];
    this._scale = scale ?? this._scale;
    this._totalFrames = totalFrames ?? this._totalFrames;
    this._heldFrames = heldFrames ?? this._heldFrames;
    this._offset = offset ?? this._offset;
    this._shouldFlip = shouldFlip ?? this._shouldFlip;
  }

  private draw = (canvas: HTMLCanvasElement) => {
    canvas
      .getContext("2d")!
      .drawImage(
        this._image,
        (this._currentFrame * this._image.width) / this._totalFrames,
        0,
        this._image.width / this._totalFrames,
        this._image.height,
        this._position.x + this._offset.x,
        this._position.y + this._offset.y,
        (this._image.width / this._totalFrames) * this._scale,
        this._image.height * this._scale,
      );
  };

  private animate = () => {
    this._elapsedFrames++;
    if (this._elapsedFrames % this._heldFrames === 0) {
      if (this._currentFrame < this._totalFrames - 1) {
        this._currentFrame++;
      } else {
        this._currentFrame = 0;
      }
    }
  };

  public update = (canvas: HTMLCanvasElement) => {
    this.draw(canvas);
    this.animate();
  };
}
