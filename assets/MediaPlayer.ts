// Clase media player
class MediaPlayer {
  media: HTMLMediaElement;
  plugins: Array<any>;

  constructor(config) {
    this.media = config.element;
    this.plugins = config.plugins || [];
    this.initPlugins();
  }

  private initPlugins() {
    this.plugins.forEach(plugin => {
      plugin.run(this);
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