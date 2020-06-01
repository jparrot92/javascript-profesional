import MediaPlayer from './MediaPlayer.js'
import AutoPlay from './plugins/AutoPlay.js';

// Obtine el elemento video
const video = document.querySelector('video');

// Instacia clase MediaPlayer
const player = new MediaPlayer({
  element: video,
  plugins: [
    new AutoPlay()
  ] 
});

// Obtine el elemento play button
const playButton = document.querySelector('#playButton');

// Detecta clic al boton play button
playButton.onclick = () => player.togglePlay();

// Obtine el elemento mute button
const muteButton = document.querySelector('#muteButton');

// Detecta clic al boton mute button
muteButton.onclick = () => {
  if (player.media.muted) {
    player.unmute();
  } else {
    player.mute();
  }
};