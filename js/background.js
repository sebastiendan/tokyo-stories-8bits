var renderer = new PIXI.WebGLRenderer(800, 600);
renderer.backgroundColor = 0xffffff;

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
renderer.render(stage)
