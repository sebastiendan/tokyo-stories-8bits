let buzz = require('buzz'),
    music = new buzz.sound(require('./common/assets/sounds/music.mp3')),
    hit = new buzz.sound(require('./common/assets/sounds/hit.mp3'));

export let sounds = {
  music: music,
  hit: hit,
  playHit: () => {
    if (!hit.isPaused()) {
      hit.stop();
      hit.play();
    } else {
      hit.play();
    }
  }
};

export function playMusic() {
  music.play().fadeIn(2000).loop();
}
