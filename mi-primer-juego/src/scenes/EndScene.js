import Phaser from 'phaser';

export default class EndScene extends Phaser.Scene {
  constructor() {
    super('End');
  }

  create(data) {
    const won = Boolean(data?.won);
    const { width, height } = this.scale;
    this.add.text(width / 2, 170, won ? 'HAS ESCAPADO' : 'LA SOMBRA TE ALCANZÓ', {
      color: won ? '#9ee8ff' : '#ef466f',
      fontFamily: 'monospace',
      fontSize: won ? '40px' : '32px',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.add.text(width / 2, 250, won ? 'El umbral se cierra detrás de ti.' : 'Los obstáculos no perdonan.', {
      color: '#a9b2d0', fontFamily: 'monospace', fontSize: '17px'
    }).setOrigin(0.5);
    const retry = this.add.text(width / 2, 350, '[ ESPACIO O CLIC PARA REINTENTAR ]', {
      color: '#d9e1ff', fontFamily: 'monospace', fontSize: '18px'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    retry.on('pointerdown', () => this.scene.start('Game'));
    this.input.keyboard.once('keydown-SPACE', () => this.scene.start('Game'));
  }
}
