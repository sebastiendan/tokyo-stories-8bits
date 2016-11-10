import {Sprite} from '../../abstract/sprite';

export default class Herbs extends Sprite {
  static sprites = [
    require('./assets/sprites/herbs.png'),
  ];

  constructor(game: any) {
    super(game, Herbs.sprites);
  }

}
