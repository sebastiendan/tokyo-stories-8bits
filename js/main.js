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

let nori = {
  id: 0,
  asset: "assets/items/levels/1/nori.png"
};

let rice = {
  id: 1,
  asset: "assets/items/levels/1/rice.png"
};

let eggs = {
  id: 2,
  asset: "assets/items/levels/1/eggs.png"
};

let tarama = {
  id: 3,
  asset: "assets/items/levels/1/tarama.png"
};

let herbs = {
  id: 4,
  asset: "assets/items/levels/1/herbs.png"
};

let items = [nori, rice, eggs, tarama, herbs];

let foreground = "assets/levels/1/foreground.png";
let background = "assets/levels/1/background.png";
let backgroundCloud = "assets/levels/1/background-cloud.png";
let backgroundSun = "assets/levels/1/background-sun.png";

let mp3 = "assets/sounds/levels/1/essai1.wav";
let hit = "assets/sounds/common/hit.wav";

let thingsToLoad = seb.concat([nori.asset], [rice.asset, eggs.asset, foreground, background, backgroundCloud, backgroundSun, mp3, hit]);

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
    speedItem = 6,
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

  let progressNori = g.sprite(nori.asset);
  let progressRice = g.sprite(rice.asset);
  let progressEggs = g.sprite(eggs.asset);
  let progressTarama = g.sprite(tarama.asset);
  let progressHerbs = g.sprite(herbs.asset);

  g.progress = g.group(progressNori, progressRice, progressEggs, progressTarama, progressHerbs);
  g.progress.y = 80;

  progressNori.x = 0;
  progressRice.x = progressNori.x + 105;
  progressEggs.x = progressRice.x + 105;
  progressTarama.x = progressEggs.x + 105;
  progressHerbs.x = progressTarama.x + 105;

  progressNori.alpha = .5;
  progressRice.alpha = .5;
  progressEggs.alpha = .5;
  progressTarama.alpha = .5;
  progressHerbs.alpha = .5;

  g.progress.x = g.canvas.width - 520;
  g.progress.scale.x = .5;
  g.progress.scale.y = .5;

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

  g.seb.items = [];

  function addItem() {
    let index = Math.floor(Math.random()*items.length),
        item = g.sprite(items[index].asset);

    item.id = items[index].id;
    item.alive = true;
    item.x = g.canvas.width - item.width;
    item.groundLevel = Math.floor(Math.random()*grounds.length);
    item.vx = -speedItem;
    g.items.push(item);

    setTimeout(addItem, 1500 + Math.floor((4 - speedItem)*100))
  }

  g.score = 0;
  g.scoreMessage = g.text("Number of onigiri: " + g.score, "34px Futura", "white", 20, 20);
  g.scoreMessage.x = 10;
  g.scoreMessage.y = 10;

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
      g.hit.play();
      item.alive = false;
      item.visible = false;

      if (0 < g.seb.items.length && item.id == Math.max.apply(Math, g.seb.items) + 1 || !item.id && g.seb.items.length == 0) {
        g.seb.items.push(item.id);
      } else {
        g.seb.items = [];
      }


      if (g.seb.items.length > 0) {
        for (let i=0, len=g.seb.items.length; i<len; i++) {
          g.progress.children[i].alpha = 1;
        }
      } else {
        for (let i=0, len=g.progress.children.length; i<len; i++) {
          g.progress.children[i].alpha = .5;
        }
      }

      if (g.seb.items.length == 5) {
        g.score++;
        g.scoreMessage.content = "Number of onigiri: " + g.score;
        g.seb.items = [];
        for (let i=0, len=g.progress.children.length; i<len; i++) {
          g.progress.children[i].alpha = .5;
        }
      }
    }
  });

  g.background.tileX -= .2;
  g.backgroundSun.rotation += 2;
  g.backgroundCloud.tileX -= .1;
  g.foreground.tileX -= speed-0.5;
}
