import MediaPlayer from './MediaPlayer.js'

// Obtine el elemento video
const video = document.querySelector('video');
// Obtine el elemento button
const button = document.querySelector('button');

// Instacia clase MediaPlayer
const player = new MediaPlayer({ element: video });

// Detecta clic al boton
button.onclick = () => player.togglePlay();