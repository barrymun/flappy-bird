import { GameEngine } from "core/game-engine";
import { Sprite, SpriteProps } from "core/sprite";
import { pipeMovementSpeed } from "utils";

export class Pipe extends Sprite {
  constructor(props: SpriteProps) {
    super(props);
  }

  public update = () => {
    this.draw();
    this.animate();
    if (this.position.x < -this._image.width * this._scale) {
      this.position.x = GameEngine.canvas.width;
    } else {
      this.position.x -= pipeMovementSpeed;
    }
  };
}
