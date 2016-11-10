import {Sprite} from '../../abstract/sprite';

export default class Eggs extends Sprite {
  static sprites = [
    require('./assets/sprites/eggs.png'),
  ];

  constructor(game: any) {
    super(game, Eggs.sprites);
  }

}
