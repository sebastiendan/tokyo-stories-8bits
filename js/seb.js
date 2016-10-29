// You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
// which will try to choose the best renderer for the environment you are in.
var size = 100;
var nbImages = 9;
var anim = true;
var reverse = false;
var renderer = new PIXI.WebGLRenderer(size, size);
renderer.backgroundColor = 0xffffff;

// The renderer will create a canvas element for you that you can then insert into the DOM.
document.body.appendChild(renderer.view);

// You need to create a root container that will hold the scene you want to draw.
var stage = new PIXI.Container();

// Declare a global variable for our sprite so that the animate function can access it.
var seb = null;

// load the texture we need
PIXI.loader.add('seb', 'assets/characters/seb/seb-run.png').load(function (loader, resources) {
    // This creates a texture from a 'bunny.png' image.
    seb = new PIXI.Sprite(resources.seb.texture);

    // Setup the position and scale of the bunny
    seb.position.x = 0;
    seb.position.y = 0;

    // Add the bunny to the scene we are building.
    stage.addChild(seb);
    renderer.render(stage);

    // kick off the animation loop (defined below)
    document.onkeydown = function(e){
      if ((e.keyCode == '37' || e.keyCode == '39') && !anim) {
        anim = true;
        seb.position.x = 0;
        animate();
      }
    };

    document.onkeyup = function(e){
      if ((e.keyCode == '37' || e.keyCode == '39') && anim) {
        anim = false;
      }
    };;
});

function animate() {
    // start the timer for the next animation loop
    if (anim) {
      setTimeout(function(){
        id = requestAnimationFrame(animate);
      }, 75);
    }

    // each frame we spin the bunny around a bit
    if (seb.position.x == -(nbImages-1)*size) {
      seb.position.x = 0;
    } else {
      seb.position.x -= size;
    }

    // this is the main render call that makes pixi draw your container and its children.
    renderer.render(stage);
}
