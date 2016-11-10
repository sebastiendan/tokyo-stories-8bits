import {IComponentOptions, ITimeoutService, IScope} from "angular";
require('./storyLine.scss');

export default class StoryLine implements IComponentOptions {

    public controller: any = StoryLineController;
    public controllerAs: string = 'slc';
    public template: string = require('./storyLine.html');
    public bindings: {[x: string]: string} = {
      content: '@',
      index: '<',
      timeline: '='
    };

}

class StoryLineController {
  static $inject = ['$timeout', '$scope', 'sounds'];

  canContinue: boolean = false;
  index: number;
  timeline: number;
  visible: boolean = false;
  watch: any;

  constructor(private $timeout: ITimeoutService, private $scope: IScope, private _sounds: any) {
  }

  $onInit(): void {
    this.watch = this.$scope.$watch('slc.timeline', (newValue: number, oldValue: number) => {
      if (newValue == this.index) {
        this.visible = true;

        // this.$timeout(() => {
        //   this.canContinue = true;
        // }, 1000);
      }
    });
  };

  showContinue(): void {
    this.canContinue = true;
  };

  onContinueClick(): void {
    this._sounds.playHit();
    this.watch();
    this.visible = false;
    this.timeline++;
  };
}
