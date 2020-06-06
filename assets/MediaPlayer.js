// Clase media player
class MediaPlayer {

  constructor(config) {
    this.media = config.element;
    this.plugins = config.plugins || [];
    this._initPlugins();
  }

  _initPlugins() {
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
  }

  // Metodo para reproducir el video
  play() {
    this.media.play();
  }

  // Metodo para pausar el video
  pause() {
    this.media.pause();
  }

  // Metodo para reproducir/pausar el video
  togglePlay() {
    if (this.media.paused) {
      this.play();
    }
    else {
      this.pause();
    }
  }

  // Metodo para silenciar el video
  mute() {
    this.media.muted = true;
  }

  // Metodo para dessilenciar el video
  unmute() {
    this.media.muted = false;
  }
}

export default MediaPlayer