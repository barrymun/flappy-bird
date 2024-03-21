import { GameEngine } from "core/game-engine";
import { Sprite, SpriteProps } from "core/sprite";
import { PipeUpdateProps, pipeMovementSpeed, pipeScale } from "utils";

export class Pipe extends Sprite {
  _isCleared: boolean = false;

  public get isCleared() {
    return this._isCleared;
  }

  public set isCleared(value: boolean) {
    this._isCleared = value;
  }

  constructor(props: SpriteProps) {
    super(props);
  }

  public update(pipeUpdateProps?: PipeUpdateProps) {
    if (!pipeUpdateProps) {
      super.update();
      return;
    }

    const { isBottomPipe, newPosition } = pipeUpdateProps;
    const { pipeGap, pipeHeight } = GameEngine.instance.getPipeData();

    if (this.position.x < -this._image.width * this._scale) {
      if (isBottomPipe) {
        this.position.y = newPosition;
      } else {
        this.position.y = newPosition - pipeGap - pipeHeight * pipeScale;
      }
      // reset the pipe to the right side of the canvas
      this.position.x = GameEngine.canvas.width;
      this.isCleared = false;
    } else {
      // move the pipe to the left
      this.position.x -= pipeMovementSpeed;
    }
    super.update();
  }
}
