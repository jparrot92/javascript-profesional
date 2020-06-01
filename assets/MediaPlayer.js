// Clase media player
function MediaPlayer(config) {
  this.media = config.element
  this.plugins = config.plugins || []

  this._initPlugins();
}

MediaPlayer.prototype._initPlugins = function() {
  const player = {
    play: () => this.play(),
    pause: () => this.pause(),
    media: this.media,
    get muted() {
      return this.media.muted;
    },
    set muted(value) {
      this.media.muted = value;
    },
  };

  this.plugins.forEach(plugin => {
    plugin.run(player);
  });
};

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

// Metodo para silenciar el video
MediaPlayer.prototype.mute = function() {
  this.media.muted = true;
};

// Metodo para dessilenciar el video
MediaPlayer.prototype.unmute = function() {
  this.media.muted = false;
};

export default MediaPlayer