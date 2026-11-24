import Phaser from 'phaser';

export default class EndScene extends Phaser.Scene {
  constructor() {
    super('End');
  }

  init(data) {
    this.chapter = Number(data?.chapter || 1);
  }

  create() {
    const { width, height } = this.scale;
    const chapterNames = [
      'CICATRICES Y SILENCIO',
      'LA ESPERANZA',
      'CENIZAS Y CANCIONES',
      'EL PESO DE LOS FANTASMAS',
      'EL VUELO DE LAS ALAS'
    ];
    const endings = [
      'La coraza no fue mi hogar.\nEncontré que confiar no borraba el pasado:\nsolo hacía posible el camino siguiente.',
      'El grupo dejó de ser una obligación.\nDescubrí que proteger a otros también podía sostenerme.',
      'La canción volvió tolerable el silencio.\nLa cabaña ardiendo ya no fue el único recuerdo.',
      'La culpa quiso conservarme entre sus sombras.\nPero Rick y los demás dejaron una razón para seguir.',
      'Sobrevivir fue aprender a cruzar la noche.\nVivir es atreverse a querer, aun sabiendo que duele.'
    ];
    this.add.text(width / 2, 130, `CAPÍTULO ${this.chapter} COMPLETADO`, {
      color: '#e8c98a',
      fontFamily: 'monospace',
      fontSize: '38px',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.add.text(width / 2, 185, chapterNames[this.chapter - 1], {
      color: '#aaa39a',
      fontFamily: 'monospace',
      fontSize: '15px'
    }).setOrigin(0.5);
    this.add.text(width / 2, 260, endings[this.chapter - 1], {
      align: 'center',
      color: '#ded7cb',
      fontFamily: 'monospace',
      fontSize: '18px',
      lineSpacing: 10
    }).setOrigin(0.5);
    const nextChapter = this.chapter < 5 ? this.chapter + 1 : null;
    const next = this.add.text(width / 2, 350,
      nextChapter ? `[ CONTINUAR CAPÍTULO ${nextChapter} ]` : '[ REGRESAR AL MENÚ DE CAPÍTULOS ]', {
      color: '#f4dfad',
      fontFamily: 'monospace',
      fontSize: '18px'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    next.on('pointerdown', () =>
      nextChapter ? this.scene.start('Game', { chapter: nextChapter }) : this.scene.start('Menu')
    );

    const menu = this.add.text(width / 2, 400, '[ MENÚ DE TODOS LOS CAPÍTULOS ]', {
      color: '#b7aa91',
      fontFamily: 'monospace',
      fontSize: '15px'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    menu.on('pointerdown', () => this.scene.start('Menu'));

    const landing = this.add.text(width / 2, 450, '[ VOLVER A LA LANDING PAGE ]', {
      color: '#8e887b',
      fontFamily: 'monospace',
      fontSize: '14px'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    landing.on('pointerdown', () => {
      window.location.href = `${window.location.origin}/lita-ushina-alison-katiuska-jueg-gr1/`;
    });

    this.input.keyboard.once('keydown-SPACE', () => {
      if (nextChapter) this.scene.start('Game', { chapter: nextChapter });
      else this.scene.start('Menu');
    });
  }
}
