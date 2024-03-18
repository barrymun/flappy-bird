import { GameEngine } from "core/game-engine";
import { Sprite, SpriteProps } from "core/sprite";
import { PipeUpdateProps, pipeMovementSpeed, pipeScale } from "utils";

export class Pipe extends Sprite {
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
      // reset the this to the right side of the canvas
      this.position.x = GameEngine.canvas.width;
    } else {
      // move the this to the left
      this.position.x -= pipeMovementSpeed;
    }
    super.update();
  }
}
