import {IComponentOptions} from "angular";
require('./level.scss');

declare var hexi: any;

export default class Level implements IComponentOptions {

    public controller: any = LevelController;
    public controllerAs: string = 'lc';

}

export abstract class LevelController {

  downArrow: any;
  game: any = {};
  hitSound: any;
  hero: any;
  leftArrow: any;
  lose: boolean = false;
  music: any;
  rightArrow: any;
  spaceBar: any;
  storyTimeline: number = 1;
  thingsToLoad: string[];
  upArrow: any;
  win: boolean = false;

  abstract end(): void;
  abstract initValues(): void;
  abstract play(): void;
  abstract setupFunc(): void;

  start(): void {
    this.storyTimeline = 0;
    this.game = hexi(800, 600, () => { this.setup(this.setupFunc) }, this.thingsToLoad, () => {this.game.loadingBar();});

    this.leftArrow = this.game.keyboard(37);
    this.rightArrow = this.game.keyboard(39);
    this.upArrow = this.game.keyboard(38);
    this.downArrow = this.game.keyboard(40);
    this.spaceBar = this.game.keyboard(32);

    this.game.start();
  };

  setup(func: () => void): void {
    func.call(this);
    this.initValues.call(this);
    this.game.state = () => { this.play.call(this) };
  };

  $onDestroy(): void {
    this.hero = this.game.state = this.game = this.play = this.setupFunc = null;
  };

}
