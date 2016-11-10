import {Sprite} from '../../abstract/sprite';

export default class Nori extends Sprite {
  static sprites = [
    require('./assets/sprites/nori.png'),
  ];

  constructor(game: any) {
    super(game, Nori.sprites);
  }

}
