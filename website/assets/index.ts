import MediaPlayer from '@jparrot92/flinsuumediaplayer';
import AutoPlay from '@jparrot92/flinsuumediaplayer/lib/plugins/AutoPlay';
import AutoPause from '@jparrot92/flinsuumediaplayer/lib/plugins/AutoPause';
import Ads from '@jparrot92/flinsuumediaplayer/lib/plugins/Ads';

// Obtine el elemento video
const video = document.querySelector('video');

// Instacia clase MediaPlayer
const player = new MediaPlayer({
  element: video,
  plugins: [
    new AutoPlay(),
    new AutoPause(),
    new Ads()
  ] 
});

// Obtine el elemento play button
const playButton: HTMLElement = document.querySelector('#playButton');

// Detecta clic al boton play button
playButton.onclick = () => player.togglePlay();

// Obtine el elemento mute button
const muteButton: HTMLElement = document.querySelector('#muteButton');

// Detecta clic al boton mute button
muteButton.onclick = () => {
  if (player.media.muted) {
    player.unmute();
  } else {
    player.mute();
  }
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(error => {
    console.log(error.message);
  });
}