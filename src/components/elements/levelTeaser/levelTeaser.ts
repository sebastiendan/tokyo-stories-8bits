import {IComponentOptions} from "angular";
require('./levelTeaser.scss');

export default class LevelTeaser implements IComponentOptions {

    public controller: any = LevelTeaserController;
    public controllerAs: string = 'ltc';
    public template: string = require('./levelTeaser.html');
    public bindings: {[x: string]: string} = {
      description: '@',
      imageUrl: '@',
      state: '@',
      title: '@'
    };

}

class LevelTeaserController {
  static $inject = ['sounds'];

  constructor(private _sounds: any) {
  }

}
