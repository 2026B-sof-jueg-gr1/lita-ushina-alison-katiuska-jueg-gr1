import Phaser from 'phaser';

const LEVEL_WIDTH = 3000;
const GROUND_Y = 438;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init(data) {
    this.chapter = Number(data?.chapter || 1);
  }

  create() {
    this.finished = false;
    this.dialogueOpen = false;
    this.recalled = 0;
    this.nextMemoryIndex = 0;

    this.physics.world.setBounds(0, 0, LEVEL_WIDTH, 540);
    this.cameras.main.setBounds(0, 0, LEVEL_WIDTH, 540);
    this.createTextures();
    this.createBackground();

    this.player = this.physics.add.sprite(130, GROUND_Y - 50, 'daryl-front');
    this.player.setDisplaySize(78, 118);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(4);
    this.player.body.setSize(54, 100).setOffset(38, 24);

    this.createMemories();
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.createInterface();

    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      d: Phaser.Input.Keyboard.KeyCodes.D,
      e: Phaser.Input.Keyboard.KeyCodes.E,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE
    });
    this.input.keyboard.on('keydown-M', () => this.scene.start('Menu'));
    this.input.keyboard.on('keydown-ESC', () => this.scene.start('Menu'));
  }

  createTextures() {
    if (this.textures.exists('memory')) return;
    const graphics = this.make.graphics({ add: false });
    graphics.fillStyle(0xe8c98a).fillCircle(22, 22, 16);
    graphics.fillStyle(0xffedba).fillCircle(22, 22, 7);
    graphics.generateTexture('memory', 44, 44);
    graphics.destroy();
  }

  createBackground() {
    const chapterPalettes = [
      [0x171923, 0x242630, 0x1d2433],
      [0x20251f, 0x30372d, 0x26372d],
      [0x2a211c, 0x46372d, 0x4a2f24],
      [0x18151e, 0x30283a, 0x24182d],
      [0x393126, 0x62543a, 0x806a3f]
    ];
    const palette = chapterPalettes[this.chapter - 1];
    this.add.rectangle(LEVEL_WIDTH / 2, 270, LEVEL_WIDTH, 540, palette[0]).setDepth(-20);

    const distant = this.add.graphics().setDepth(-10);
    distant.fillStyle(palette[1]);
    for (let x = -80; x < LEVEL_WIDTH; x += 210) {
      distant.fillTriangle(x, 350, x + 95, 105, x + 190, 350);
    }

    const ground = this.add.rectangle(LEVEL_WIDTH / 2, GROUND_Y + 51, LEVEL_WIDTH, 102, 0x2a2825);
    ground.setDepth(-5);

    for (let x = 40; x < LEVEL_WIDTH; x += 170) {
      this.add.rectangle(x, GROUND_Y - 30 - (x % 5) * 8, 12, 180, 0x17161a)
        .setDepth(-3);
      this.add.circle(x - 10, GROUND_Y - 125 - (x % 3) * 10, 50, 0x20231f, 0.8)
        .setDepth(-2);
    }

    this.sceneTint = this.add.rectangle(LEVEL_WIDTH / 2, 270, LEVEL_WIDTH, 540, palette[2], this.chapter === 4 ? 0.68 : 0.52)
      .setDepth(8).setScrollFactor(1);
  }

  createMemories() {
    const chapterMemories = [
      [
        { x: 720, title: 'RECUERDO I · UNA FLECHA', text: 'Por mucho tiempo pensé que depender era una debilidad.\nPero sobrevivir nunca fue una tarea hecha para una sola persona.' },
        { x: 1540, title: 'RECUERDO II · UNA RADIO', text: 'Escuché voces y aprendí a responder.\nLa confianza llegó como una señal tenue, cuando decidí no apagarla.' },
        { x: 2380, title: 'RECUERDO III · UNA FOGATA', text: 'La coraza se calentó hasta dejarme sentir.\nTodavía llevo las cicatrices, pero ya no camino solo.' }
      ],
      [
        { x: 720, title: 'RECUERDO I · SOPHIA', text: 'La búsqueda me enseñó que cuidar no era una obligación ajena.\nPor primera vez, alguien podía contar conmigo.' },
        { x: 1540, title: 'RECUERDO II · CAROL', text: 'Carol entendía el dolor sin pedir explicaciones.\nSu cercanía volvió tolerable dejar entrar a alguien.' },
        { x: 2380, title: 'RECUERDO III · EL GRUPO', text: 'Ya no seguía sombras ni órdenes.\nHabía encontrado un lugar que también me necesitaba.' }
      ],
      [
        { x: 720, title: 'RECUERDO I · UNA CANCIÓN', text: 'Beth hizo que la cabaña dejara de parecer una prisión.\nHubo una noche en la que una melodía pudo vencer al miedo.' },
        { x: 1540, title: 'RECUERDO II · LA CUCHARA', text: 'En sus gestos pequeños apareció una felicidad posible.\nNo debía merecerla; debía aprender a aceptarla.' },
        { x: 2380, title: 'RECUERDO III · LAS CENIZAS', text: 'La cabaña ardió, pero el pasado dejó de encerrarme.\nQuemar las heridas no las borra: deja espacio para sanar.' }
      ],
      [
        { x: 720, title: 'RECUERDO I · EL HOSPITAL', text: 'Sus voces dijeron que sobrevivir fue mi culpa.\nLa estática volvió cada pérdida una condena.' },
        { x: 1540, title: 'RECUERDO II · GLENN', text: 'Negan me quitó al hermano que Rick había construido conmigo.\nLa rabia quiso reemplazar al amor, pero no pudo.' },
        { x: 2380, title: 'RECUERDO III · RICK', text: 'Hermandad no significaba vengar cada golpe.\nSignificaba seguir su propósito incluso cuando el camino dolía.' }
      ],
      [
        { x: 720, title: 'RECUERDO I · EL AMANECER', text: 'La niebla dejó ver que Judith no necesitaba a un héroe.\nNecesitaba a alguien que permaneciera.' },
        { x: 1540, title: 'RECUERDO II · LOS QUE FUERON', text: 'Beth, Glenn y Rick seguían vivos en las decisiones que quedaban.\nEl duelo dejó de ser una jaula y se volvió recuerdo.' },
        { x: 2380, title: 'RECUERDO III · LAS ALAS', text: 'Sobrevivir fue aprender a cruzar la noche.\nVivir es atreverse a querer, aun sabiendo que duele.' }
      ]
    ];
    this.memoryData = chapterMemories[this.chapter - 1];

    this.memories = this.memoryData.map((memory, index) => {
      const glow = this.add.circle(memory.x, GROUND_Y - 65, 30, 0xe8c98a, 0.12)
        .setDepth(2);
      const point = this.physics.add.staticSprite(memory.x, GROUND_Y - 65, 'memory').setDepth(3);
      this.tweens.add({
        targets: [glow, point],
        y: '+=10',
        duration: 1200 + index * 140,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
      return { ...memory, glow, point, resolved: false };
    });
  }

  createInterface() {
    const chapterNames = [
      'CICATRICES Y SILENCIO',
      'LA ESPERANZA',
      'CENIZAS Y CANCIONES',
      'EL PESO DE LOS FANTASMAS',
      'EL VUELO DE LAS ALAS'
    ];
    this.progressText = this.add.text(24, 20, `C${this.chapter} · ${chapterNames[this.chapter - 1]} · 0 / 3`, {
      color: '#b7aa91',
      fontFamily: 'monospace',
      fontSize: '14px'
    }).setScrollFactor(0).setDepth(20);
    this.add.text(936, 20, '[ M / ESC ] MENÚ', {
      color: '#8e887b',
      fontFamily: 'monospace',
      fontSize: '12px'
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(20);

    this.prompt = this.add.text(480, 470, 'Presiona [E] o [ESPACIO] para recordar', {
      color: '#f5e4b7',
      backgroundColor: '#111217',
      padding: { x: 14, y: 9 },
      fontFamily: 'monospace',
      fontSize: '16px'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(20).setVisible(false);
  }

  update() {
    if (this.finished) return;

    if (!this.dialogueOpen) {
      const movingLeft = this.keys.left.isDown || this.keys.a.isDown;
      const movingRight = this.keys.right.isDown || this.keys.d.isDown;
      let velocity = 0;

      if (movingLeft) {
        velocity = -180;
        this.player.setTexture('daryl-left');
      } else if (movingRight) {
        velocity = 180;
        this.player.setTexture('daryl-right');
      } else {
        this.player.setTexture('daryl-front');
      }
      this.player.setVelocityX(velocity);
      if (this.player.body.velocity.x !== 0) {
        this.player.setAngle(this.player.body.velocity.x > 0 ? 1 : -1);
      } else {
        this.player.setAngle(0);
      }

      const nearMemory = this.memories.find((memory) =>
        !memory.resolved && Phaser.Math.Distance.Between(this.player.x, this.player.y, memory.x, memory.point.y) < 110
      );
      this.prompt.setVisible(Boolean(nearMemory));

      if (nearMemory &&
        (Phaser.Input.Keyboard.JustDown(this.keys.e) || Phaser.Input.Keyboard.JustDown(this.keys.space))) {
        this.openDialogue(nearMemory);
      }
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.e) ||
      Phaser.Input.Keyboard.JustDown(this.keys.space)) {
      this.closeDialogue();
    }
  }

  openDialogue(memory) {
    this.dialogueOpen = true;
    this.player.setVelocityX(0);
    this.prompt.setVisible(false);
    memory.resolved = true;
    this.recalled += 1;
    const chapterNames = [
      'CICATRICES Y SILENCIO',
      'LA ESPERANZA',
      'CENIZAS Y CANCIONES',
      'EL PESO DE LOS FANTASMAS',
      'EL VUELO DE LAS ALAS'
    ];
    this.progressText.setText(`C${this.chapter} · ${chapterNames[this.chapter - 1]} · ${this.recalled} / 3`);

    this.sceneTint.setFillStyle(this.recalled === 1 ? 0x3a3540 : this.recalled === 2 ? 0x5f4e3a : 0x8a6640,
      0.32 - this.recalled * 0.06);

    this.dialogueShade = this.add.rectangle(480, 270, 960, 540, 0x090a0f, 0.72)
      .setScrollFactor(0).setDepth(30);
    this.dialoguePanel = this.add.rectangle(480, 270, 720, 210, 0x17151a, 0.96)
      .setScrollFactor(0).setDepth(31).setStrokeStyle(1, 0xc2a66d, 0.8);
    this.dialogueTitle = this.add.text(480, 195, memory.title, {
      color: '#e8c98a',
      fontFamily: 'monospace',
      fontSize: '16px'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(32);
    this.dialogueText = this.add.text(480, 270, memory.text, {
      align: 'center',
      color: '#ece5d8',
      fontFamily: 'serif',
      fontSize: '21px',
      lineSpacing: 12,
      wordWrap: { width: 620 }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(32);
    this.dialogueContinue = this.add.text(480, 355, '[ E / ESPACIO PARA CONTINUAR ]', {
      color: '#9f9582',
      fontFamily: 'monospace',
      fontSize: '13px'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(32);
  }

  closeDialogue() {
    [
      this.dialogueShade,
      this.dialoguePanel,
      this.dialogueTitle,
      this.dialogueText,
      this.dialogueContinue
    ].forEach((object) => object?.destroy());
    this.dialogueOpen = false;

    if (this.recalled === 3) {
      this.time.delayedCall(350, () => {
        if (!this.finished) {
          this.finished = true;
          this.scene.start('End', { chapter: this.chapter });
        }
      });
    }
  }
}
