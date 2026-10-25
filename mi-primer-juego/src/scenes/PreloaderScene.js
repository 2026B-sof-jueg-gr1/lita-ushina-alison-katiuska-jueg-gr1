import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  create() {
    const { width, height } = this.scale;
    this.add.text(width / 2, height / 2 - 28, 'CARGANDO EL UMBRAL...', {
      color: '#d9e1ff',
      fontFamily: 'monospace',
      fontSize: '22px'
    }).setOrigin(0.5);
    const bar = this.add.rectangle(width / 2, height / 2 + 20, 300, 10, 0x25283a);
    this.tweens.add({
      targets: bar,
      scaleX: 0,
      duration: 260,
      yoyo: true,
      onComplete: () => this.scene.start('Menu')
    });
  }
}
