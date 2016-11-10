export abstract class Sprite {

  sprites: string[] | string;
  sprite: any;

  constructor(game: any, sprites: string[] | string) {
    this.sprite = game.sprite(sprites);
  }

}
