import {Sprite} from '../../abstract/sprite';

export default class Seb extends Sprite {
  static sprites = [
    require('./assets/sprites/seb_01.png'),
    require('./assets/sprites/seb_02.png'),
    require('./assets/sprites/seb_03.png'),
    require('./assets/sprites/seb_04.png'),
    require('./assets/sprites/seb_05.png'),
    require('./assets/sprites/seb_06.png'),
    require('./assets/sprites/seb_07.png'),
    require('./assets/sprites/seb_08.png'),
    require('./assets/sprites/seb_09.png')
  ];

  constructor(game: any) {
    super(game, Seb.sprites);
  }

}
