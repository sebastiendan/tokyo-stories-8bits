import {Sprite} from '../../abstract/sprite';

export default class Tarama extends Sprite {
  static sprites = [
    require('./assets/sprites/tarama.png'),
  ];

  constructor(game: any) {
    super(game, Tarama.sprites);
  }

}
