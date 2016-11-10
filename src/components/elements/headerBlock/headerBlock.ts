import {IComponentOptions} from "angular";

export default class HeaderBlock implements IComponentOptions {

    public controller: any = HeaderBlockController;
    public controllerAs: string = 'hbc';
    public template: string = require('./headerBlock.html');

}

class HeaderBlockController {
  static $inject = ['sounds'];

  githubLogoUrl: string = require('../../../common/assets/images/github.png');
  twitterLogoUrl: string = require('../../../common/assets/images/twitter.png');

  constructor(private _sounds: any) {    
  }

}
