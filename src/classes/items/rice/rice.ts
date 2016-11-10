import {Sprite} from '../../abstract/sprite';

export default class Rice extends Sprite {
  static sprites = [
    require('./assets/sprites/rice.png'),
  ];

  constructor(game: any) {
    super(game, Rice.sprites);
  }

}
