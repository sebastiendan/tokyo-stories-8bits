import {IComponentOptions, ITimeoutService} from 'angular';
import {LevelController} from '../abstract/level';
import Seb from '../../../classes/heroes/seb/seb';
import Eggs from '../../../classes/items/eggs/eggs';
import Herbs from '../../../classes/items/herbs/herbs';
import Nori from '../../../classes/items/nori/nori';
import Rice from '../../../classes/items/rice/rice';
import Tarama from '../../../classes/items/tarama/tarama';
require('./levelPrologue.scss');

export default class Prologue implements IComponentOptions {

    public controller: any = PrologueController;
    public controllerAs: string = 'pc';
    public template: string = require('./levelPrologue.html');

}

class PrologueController extends LevelController {
  static $inject = ['$timeout'];
  static foreground = [require('./assets/images/foreground.png')];
  static background = [require('./assets/images/background.png')];
  static backgroundCloud = [require('./assets/images/background-cloud.png')];
  static backgroundSun = [require('./assets/images/background-sun.png')];
  static music = [require('./assets/sounds/prologue.mp3')];
  static hitSound = [require('./assets/sounds/hit.mp3')];
  static goodSound = [require('./assets/sounds/good.mp3')];
  static successSound = [require('./assets/sounds/success.mp3')];
  static selectSound = [require('./assets/sounds/select.mp3')];

  background: any;
  backgroundSun: any;
  backgroundCloud: any;
  foreground: any;
  goodSound: any;
  items: any = [];
  itemsPool: any[] = [Nori, Rice, Eggs, Tarama, Herbs];
  progress: any;
  progressNori: any;
  progressRice: any;
  progressEggs: any;
  progressTarama: any;
  progressHerbs: any;
  score: number;
  scoreMessage: any;
  selectSound: any;
  speedItem: number = 6;
  successSound: any;
  timeout: any;
  urlEggs: string = Eggs.sprites[0];
  urlHerbs: string = Herbs.sprites[0];
  urlNori: string = Nori.sprites[0];
  urlRice: string = Rice.sprites[0];
  urlTarama: string = Tarama.sprites[0];

  readonly gravity = 1;
  readonly initJumpSpeed = 19;
  readonly speed = 6.1;
  readonly grounds = [340, 400, 460];

  constructor(private $timeout: ITimeoutService) {
    super();
  }

  $onInit(): void {
    this.thingsToLoad = [].concat(Seb.sprites, Nori.sprites, Rice.sprites, Eggs.sprites, Herbs.sprites, Tarama.sprites, PrologueController.foreground, PrologueController.background, PrologueController.backgroundCloud, PrologueController.backgroundSun, PrologueController.music, PrologueController.hitSound, PrologueController.successSound, PrologueController.goodSound, PrologueController.selectSound);
    // this.start();
  };

  $onDestroy(): void {
    this.$timeout.cancel(this.timeout);
    super.$onDestroy();
  };

  setupFunc(): void {
    this.background = this.game.tilingSprite(PrologueController.background[0], this.game.canvas.width, 440);
    this.background.y = 0;

    this.backgroundSun = this.game.sprite(PrologueController.backgroundSun);
    this.backgroundSun.x = 660;
    this.backgroundSun.y = 60;
    this.backgroundSun.pivotX = .5;
    this.backgroundSun.pivotY = .5;

    this.backgroundCloud = this.game.tilingSprite(PrologueController.backgroundCloud[0], this.game.canvas.width, 440);
    this.backgroundCloud.y = 0;

    this.foreground = this.game.tilingSprite(PrologueController.foreground[0], this.game.canvas.width, 220);
    this.foreground.y = 380;

    this.progressNori = new Nori(this.game).sprite;
    this.progressRice = new Rice(this.game).sprite;
    this.progressEggs = new Eggs(this.game).sprite;
    this.progressTarama = new Tarama(this.game).sprite;
    this.progressHerbs = new Herbs(this.game).sprite;

    this.progress = this.game.group(this.progressNori, this.progressRice, this.progressEggs, this.progressTarama, this.progressHerbs);
    this.progress.y = 80;

    this.progressNori.x = 0;
    this.progressRice.x = this.progressNori.x + 105;
    this.progressEggs.x = this.progressRice.x + 105;
    this.progressTarama.x = this.progressEggs.x + 105;
    this.progressHerbs.x = this.progressTarama.x + 105;

    this.progressNori.alpha = .5;
    this.progressRice.alpha = .5;
    this.progressEggs.alpha = .5;
    this.progressTarama.alpha = .5;
    this.progressHerbs.alpha = .5;

    this.progress.x = this.game.canvas.width - 520;
    this.progress.scale.x = .5;
    this.progress.scale.y = .5;

    this.music = this.game.sound(PrologueController.music);
    this.music.loop = true;
    this.music.volume = 0;
    this.music.play();
    this.music.fade(.5, 2);

    this.hitSound = this.game.sound(PrologueController.hitSound);
    this.hitSound.volume = .12;

    this.goodSound = this.game.sound(PrologueController.goodSound);
    this.goodSound.volume = .4;

    this.selectSound = this.game.sound(PrologueController.selectSound);
    this.selectSound.volume = .07;

    this.successSound = this.game.sound(PrologueController.successSound);
    this.successSound.volume = .3;

    this.timeout = this.$timeout(this.addItem, 1000);

    this.hero = new Seb(this.game).sprite;
    this.hero.x = 0;
    this.hero.groundLevel = 1;
    this.hero.items = [];
    this.hero.playAnimation();

    this.score = 0;
    this.scoreMessage = this.game.text('Okinawan Onigiri: ' + this.score, '34px Futura', 'black', 20, 20);
    this.scoreMessage.x = 10;
    this.scoreMessage.y = 10;

    this.upArrow.press = () => {
      if (this.hero.groundLevel > 0) {
        this.hero.groundLevel--;
        this.selectSound.play();
      }
    };

    this.downArrow.press = () => {
      if (this.hero.groundLevel < this.grounds.length-1) {
        this.hero.groundLevel++;
        this.selectSound.play();
      }
    };
  }

  play(): void {
    let good: boolean = false;

    this.game.contain(this.hero, this.game.stage);

    this.hero.y = this.grounds[this.hero.groundLevel];

    this.items.forEach((item: any) => {
      item.x -= this.speedItem;
      item.y = this.grounds[item.groundLevel] + (this.hero.height - item.height)/2;

      if (this.game.hitTestRectangle(this.hero, item) && this.hero.groundLevel == item.groundLevel && item.alive) {
        this.speedItem += .2;
        this.hero.x += 5;
        item.alive = false;
        item.visible = false;

        if (0 < this.hero.items.length && item.id == Math.max.apply(Math, this.hero.items) + 1 || !item.id && this.hero.items.length == 0) {
          this.hero.items.push(item.id);
          good = true;
        } else {
          this.hero.items = [];
        }

        if (this.hero.items.length > 0) {
          for (let i=0, len=this.hero.items.length; i<len; i++) {
            this.progress.children[i].alpha = 1;
          }
        } else {
          for (let i=0, len=this.progress.children.length; i<len; i++) {
            this.progress.children[i].alpha = .5;
          }
        }

        if (this.hero.items.length == 5) {
          this.score++;
          this.successSound.play();
          this.scoreMessage.content = 'Number of onigiri: ' + this.score;
          this.hero.items = [];
          for (let i=0, len=this.progress.children.length; i<len; i++) {
            this.progress.children[i].alpha = .5;
          }
        } else {
          if (good) {
            this.goodSound.play();
          } else {
            this.hitSound.play();
          }
        }
      }
    });

    this.background.tileX -= .2;
    this.backgroundSun.rotation += 2;
    this.backgroundCloud.tileX -= .1;
    this.foreground.tileX -= this.speed-0.5;
  }

  private addItem = () => {
    let index = Math.floor(Math.random()*this.itemsPool.length),
        item = new this.itemsPool[index](this.game).sprite;

    item.id = index;
    item.alive = true;
    item.x = this.game.canvas.width - item.width;
    item.groundLevel = Math.floor(Math.random()*this.grounds.length);
    item.vx = -this.speedItem;
    this.items.push(item);

    this.timeout = this.$timeout(this.addItem, 1500 + Math.floor((4 - this.speedItem)*100));
  }

}
