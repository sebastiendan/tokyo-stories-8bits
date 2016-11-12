import {IComponentOptions} from "angular";
require('./levelTeaser.scss');

export default class LevelTeaser implements IComponentOptions {

    public controller: any = LevelTeaserController;
    public controllerAs: string = 'ltc';
    public template: string = require('./levelTeaser.html');
    public bindings: {[x: string]: string} = {
      description: '@',
      imageUrl: '@',
      share: '@',
      state: '@',
      title: '@'
    };

}

class LevelTeaserController {
  static $inject = ['sounds', '$mdBottomSheet'];

  share: string;

  constructor(private _sounds: any, private $mdBottomSheet: any) {
  }

  showShareBottomSheet(): void {
    this.$mdBottomSheet.show({
      template: require('../shareBottomSheet/shareBottomSheet.html').replace(/###level###/g, this.share)
    });
  };
}
