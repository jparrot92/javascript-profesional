// Clase media player
function MediaPlayer(config) {
  this.media = config.element
}

// Metodo para reproducir el video
MediaPlayer.prototype.play = function () {
  this.media.play();
};

// Metodo para pausar el video
MediaPlayer.prototype.pause = function () {
  this.media.pause();
};

// Metodo para reproducir/pausar el video
MediaPlayer.prototype.togglePlay = function () {
  if (this.media.paused) {
    this.play();
  } else {
    this.pause();
  }
};

export default MediaPlayer