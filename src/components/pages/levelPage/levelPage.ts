import {IComponentOptions, ITimeoutService, IScope} from "angular";
import {IStateParamsService} from "angular-ui-router";

export default class LevelPage implements IComponentOptions {

    public controller: any = LevelPageController;
    public controllerAs: string = 'lpc';
    public template: string = require('./levelPage.html');

}

class LevelPageController {
  static $inject = ['$stateParams', '$timeout', '$scope', 'sounds'];

  levelId: string;

  constructor(private $stateParams: IStateParamsService, private $timeout: ITimeoutService, private $scope: IScope, private _sounds: any) {
  }

  $onInit(): void {
    this.levelId = this.$stateParams['level'];

    if (!this._sounds.music.volume) {
      this._sounds.music.bind("loadeddata", () => {
        this._sounds.music.stop();
      });
    } else {
      this._sounds.music.stop();
    }
  };

  $onDestroy(): void {
    this._sounds.music.fadeIn();
  }
}
