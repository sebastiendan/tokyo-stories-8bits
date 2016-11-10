import {IComponentOptions} from "angular";

export default class LevelsPage implements IComponentOptions {

    public controller: any = LevelsPageController;
    public controllerAs: string = 'lpc';
    public template: string = require('./levelsPage.html');

}

class LevelsPageController {

  prologueTeaserUrl: string = require('../../levels/levelPrologue/assets/images/teaser.png');

}
