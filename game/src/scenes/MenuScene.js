import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  create() {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor('#090b12');
    this.add.rectangle(width / 2, height / 2, width, height, 0x090b12, 0.96);
    this.add.rectangle(width / 2, height / 2, 760, 440, 0x151722, 0.96)
      .setStrokeStyle(1, 0x9d8157, 0.5);
    this.add.text(width / 2, 100, 'EL ECO DE LAS ALAS', {
      color: '#e8c98a',
      fontFamily: 'monospace',
      fontSize: '46px',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.add.text(width / 2, 145, 'SELECCIONA UN CAPÍTULO', {
      color: '#aaa39a',
      fontFamily: 'monospace',
      fontSize: '16px'
    }).setOrigin(0.5);

    const chapters = [
      ['1', 'Cicatrices y Silencio', 'El bosque'],
      ['2', 'La Esperanza', 'La prisión'],
      ['3', 'Cenizas y Canciones', 'La cabaña'],
      ['4', 'El Peso de los Fantasmas', 'El Santuario'],
      ['5', 'El Vuelo de las Alas', 'El legado']
    ];

    chapters.forEach(([number, title, location], index) => {
      const y = 205 + index * 50;
      const button = this.add.text(width / 2, y,
        `${number} · ${title}  —  ${location}`, {
          color: '#f4dfad',
          backgroundColor: '#1d1b22',
          padding: { x: 18, y: 9 },
          fontFamily: 'monospace',
          fontSize: '15px'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
      button.on('pointerover', () => button.setColor('#e8c98a'));
      button.on('pointerout', () => button.setColor('#f4dfad'));
      button.on('pointerdown', () => this.scene.start('Game', { chapter: Number(number) }));
    });

    this.add.text(width / 2, 495, 'A / D O IZQUIERDA / DERECHA · E / ESPACIO PARA RECORDAR', {
      color: '#7e7b76',
      fontFamily: 'monospace',
      fontSize: '13px'
    }).setOrigin(0.5);
  }
}
