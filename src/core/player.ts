import { GameEngine } from "core/game-engine";
import { Sprite, SpriteProps } from "core/sprite";
import { maxVelocity } from "utils";

export class Player extends Sprite {
  _velocity: number = 0;
  _score: number = 0;

  public get score() {
    return this._score;
  }

  public set score(value: number) {
    this._score = value;
  }

  constructor(props: SpriteProps) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleUnload = this.handleUnload.bind(this);
    this.bindListeners = this.bindListeners.bind(this);
    this.destroy = this.destroy.bind(this);
    this.bindListeners();
  }

  private handleClick(_event: Event | TouchEvent) {
    this._velocity = -maxVelocity;
  }

  private handleUnload(_event: Event) {
    this.destroy();
  }

  private bindListeners() {
    GameEngine.canvas.addEventListener("click", this.handleClick);
    GameEngine.canvas.addEventListener("touchstart", this.handleClick);
    window.addEventListener("unload", this.handleUnload);
  }

  private destroy() {
    GameEngine.canvas.removeEventListener("click", this.handleClick);
    GameEngine.canvas.removeEventListener("touchstart", this.handleClick);
    window.removeEventListener("unload", this.handleUnload);
  }

  public update() {
    if (this._velocity < maxVelocity) {
      this._velocity += 0.2;
    }
    this.position.y += this._velocity;
    super.update();
  }
}
