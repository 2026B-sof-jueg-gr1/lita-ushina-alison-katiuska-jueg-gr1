import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  create() {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor('#090b12');
    this.add.text(width / 2, 130, 'UMBRA RUN', {
      color: '#ef466f',
      fontFamily: 'monospace',
      fontSize: '64px',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.add.text(width / 2, 205, 'PROTOCOLO DE SUPERVIVENCIA · FASE 1', {
      color: '#a9b2d0',
      fontFamily: 'monospace',
      fontSize: '16px'
    }).setOrigin(0.5);
    const start = this.add.text(width / 2, 330, '[ PRESIONA ESPACIO O HAZ CLIC PARA ENTRAR ]', {
      color: '#d9e1ff',
      fontFamily: 'monospace',
      fontSize: '18px'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    start.on('pointerdown', () => this.scene.start('Game'));
    this.input.keyboard.once('keydown-SPACE', () => this.scene.start('Game'));
    this.add.text(width / 2, 420, 'SALTA: ESPACIO / W / ↑    ·    AVANZAS AUTOMÁTICAMENTE', {
      color: '#626b89',
      fontFamily: 'monospace',
      fontSize: '14px'
    }).setOrigin(0.5);
  }
}
