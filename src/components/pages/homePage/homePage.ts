import {IComponentOptions} from "angular";
require('./homePage.scss');

export default class HomePage implements IComponentOptions {

    public controller: any = HomePageController;
    public controllerAs: string = 'hpc';
    public template: string = require('./homePage.html');

}

class HomePageController {
  static $inject = ['sounds'];

  profileGameUrl: string = require('../../../common/assets/images/profile-game.png');
  cloudUrl: string = require('../../../common/assets/images/cloud.png');

  constructor(private _sounds: any) {

  }

  

}
