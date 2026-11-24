import Phaser from 'phaser';
import darylImage from '../daryl.jpg';
import darylFrontImage from '../daryl-front.png';
import darylRightImage from '../daryl-right.png';
import darylLeftImage from '../daryl-left.png';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    this.load.image('daryl', darylImage);
    this.load.image('daryl-front', darylFrontImage);
    this.load.image('daryl-right', darylRightImage);
    this.load.image('daryl-left', darylLeftImage);
  }

  create() {
    const { width, height } = this.scale;
    this.add.text(width / 2, height / 2 - 28, 'CARGANDO EL UMBRAL...', {
      color: '#e8c98a',
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
