//1. Setting up and starting Hexi

//An array of files you want to load
let seb = [
  "assets/characters/seb/images/seb_01.png",
  "assets/characters/seb/images/seb_02.png",
  "assets/characters/seb/images/seb_03.png",
  "assets/characters/seb/images/seb_04.png",
  "assets/characters/seb/images/seb_05.png",
  "assets/characters/seb/images/seb_06.png",
  "assets/characters/seb/images/seb_07.png",
  "assets/characters/seb/images/seb_08.png",
  "assets/characters/seb/images/seb_09.png",
];

let turtle = [
  "assets/items/turtle/images/turtle_01.png",
  "assets/items/turtle/images/turtle_02.png",
  "assets/items/turtle/images/turtle_03.png",
];

let foreground = "assets/levels/1/foreground.png";
let background = "assets/levels/1/background.png";
let backgroundCloud = "assets/levels/1/background-cloud.png";
let backgroundSun = "assets/levels/1/background-sun.png";

let mp3 = "assets/sounds/levels/1/essai1.wav";
let hit = "assets/sounds/common/hit.wav";

let thingsToLoad = seb.concat(turtle, [foreground, background, backgroundCloud, backgroundSun, mp3, hit]);

//Initialize and start Hexi
let g = hexi(800, 600, setup, thingsToLoad, load),
    leftArrow = g.keyboard(37),
    rightArrow = g.keyboard(39),
    upArrow = g.keyboard(38),
    downArrow = g.keyboard(40),
    spaceBar = g.keyboard(32),
    gravity = 1,
    initJumpSpeed = 19,
    speed = 6.1,
    speedItem = 4,
    grounds = [340, 400, 460];

g.border = "2px red dashed";

g.start();

//2. The `load` function that will run while your files are loading

function load(){

  //Display an optional loading bar
  g.loadingBar();
}

//3. The `setup` function, which initializes your game objects, variables and sprites

function setup() {

  //Create your game objects here
  g.background = g.tilingSprite(background, g.canvas.width, 440);
  g.background.y = 0;

  g.backgroundSun = g.sprite(backgroundSun);
  g.backgroundSun.x = 660;
  g.backgroundSun.y = 60;
  g.backgroundSun.pivotX = .5;
  g.backgroundSun.pivotY = .5;

  g.backgroundCloud = g.tilingSprite(backgroundCloud, g.canvas.width, 440);
  g.backgroundCloud.y = 0;

  g.foreground = g.tilingSprite(foreground, g.canvas.width, 220);
  g.foreground.y = 380;

  g.music = g.sound(mp3);
  g.music.loop = true;
  g.music.play();

  g.hit = g.sound(hit);
  g.hit.volume = .5;

  g.items = [];

  setTimeout(addItem, 1000);

  g.seb = g.sprite(seb);
  g.seb.x = 0;
  g.seb.groundLevel = 1;
  g.seb.playAnimation();

  function addItem() {
    let item = g.sprite(turtle);
    item.fps = 7;
    item.alive = true;
    item.playAnimation();
    item.x = g.canvas.width - item.width;
    item.groundLevel = Math.floor(Math.random()*grounds.length);
    item.vx = -speedItem;
    g.items.push(item);

    setTimeout(addItem, 1500 + Math.floor((4 - speedItem)*100))
  }

  g.items.forEach(function(item){
    if (g.hitTestRectangle(g.seb, item) && g.seb.groundLevel == item.groundLevel) {
      speedItem += .005;
      g.seb.x += .15;
      item.alpha = 0;
      g.hit.play();
    }
  });

  upArrow.press = () => {
    if (g.seb.groundLevel > 0) {
      g.seb.groundLevel--;
    }
  };

  upArrow.release = () => {
    if (!downArrow.isDown) {
      g.seb.vx = 0;
    }
  };

  downArrow.press = () => {
    if (g.seb.groundLevel < grounds.length-1) {
      g.seb.groundLevel++;
    }
  };

  downArrow.release = () => {
    if (!upArrow.isDown) {
      g.seb.vx = 0;
    }
  };

  g.state = play;
}

function play(){
  g.contain(g.seb, g.stage);

  g.seb.y = grounds[g.seb.groundLevel];

  g.items.forEach(function(item){
    item.x -= speedItem
    item.y = grounds[item.groundLevel] + (g.seb.height - item.height)/2;

    if (g.hitTestRectangle(g.seb, item) && g.seb.groundLevel == item.groundLevel && item.alive) {
      speedItem += .2;
      g.seb.x += 5;
      item.alpha = 0;
      g.hit.play();
      item.alive = false;
    }
  });

  g.background.tileX -= .2;
  g.backgroundSun.rotation += 2;
  g.backgroundCloud.tileX -= .1;
  g.foreground.tileX -= speed-0.5;
}
