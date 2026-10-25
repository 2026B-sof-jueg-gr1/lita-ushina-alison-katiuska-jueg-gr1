import Phaser from 'phaser';

const LEVEL_WIDTH = 5200;
const GROUND_Y = 500;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.physics.world.setBounds(0, 0, LEVEL_WIDTH, this.scale.height);
    this.cameras.main.setBounds(0, 0, LEVEL_WIDTH, this.scale.height);
    this.createTextures();
    this.createBackground();

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(LEVEL_WIDTH / 2, GROUND_Y + 30, 'ground')
      .setScale(LEVEL_WIDTH / 64, 1).refreshBody();

    this.player = this.physics.add.sprite(130, GROUND_Y - 38, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(2);
    this.player.body.setSize(34, 42).setOffset(7, 3);
    this.player.setVelocityX(260);

    this.hazards = this.physics.add.staticGroup();
    [620, 980, 1390, 1770, 2240, 2700, 3190, 3640, 4130, 4630].forEach((x, index) => {
      this.addHazard(x, GROUND_Y - 24, index % 2 === 0 ? 'spike' : 'pumpkin');
    });
    [1160, 2890, 4310].forEach((x) => this.addHazard(x, GROUND_Y - 82, 'shelf'));

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.overlap(this.player, this.hazards, () => this.finish(false), undefined, this);
    this.input.keyboard.on('keydown-SPACE', this.jump, this);
    this.input.keyboard.on('keydown-W', this.jump, this);
    this.input.keyboard.on('keydown-UP', this.jump, this);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.progress = this.add.text(24, 20, '0%', {
      color: '#d9e1ff', fontFamily: 'monospace', fontSize: '18px'
    }).setScrollFactor(0).setDepth(5);
    this.add.text(24, 48, 'ESPACIO / W / ↑  SALTAR', {
      color: '#626b89', fontFamily: 'monospace', fontSize: '13px'
    }).setScrollFactor(0).setDepth(5);
    this.finished = false;
  }

  createTextures() {
    const graphics = this.make.graphics({ add: false });
    graphics.fillStyle(0x4c536f).fillRect(0, 0, 64, 64).generateTexture('ground', 64, 64);
    graphics.clear().fillStyle(0x9ee8ff).fillCircle(24, 24, 20).fillStyle(0x20283e).fillCircle(18, 22, 4).fillCircle(32, 22, 4).generateTexture('player', 48, 48);
    graphics.clear().fillStyle(0xef466f).fillTriangle(0, 48, 24, 0, 48, 48).generateTexture('spike', 48, 48);
    graphics.clear().fillStyle(0x72502c).fillCircle(24, 28, 20).fillStyle(0xb36238).fillCircle(18, 24, 3).fillCircle(31, 24, 3).fillStyle(0x1f291d).fillRect(21, 0, 7, 10).generateTexture('pumpkin', 48, 48);
    graphics.clear().fillStyle(0x79523e).fillRect(4, 0, 8, 72).fillRect(36, 0, 8, 72).fillRect(0, 14, 48, 8).fillRect(0, 44, 48, 8).generateTexture('shelf', 48, 72);
    graphics.destroy();
  }

  createBackground() {
    this.add.rectangle(LEVEL_WIDTH / 2, 270, LEVEL_WIDTH, 540, 0x090b12);
    for (let x = 0; x < LEVEL_WIDTH; x += 320) {
      this.add.circle(x + 100, 160 + (x % 90), 70, 0x111729, 0.7);
    }
  }

  addHazard(x, y, texture) {
    this.hazards.create(x, y, texture).refreshBody();
  }

  jump() {
    if (this.finished || !this.player.body.blocked.down) return;
    this.player.setVelocityY(-560);
  }

  update() {
    if (this.finished) return;
    this.player.setVelocityX(260);
    const percent = Math.min(100, Math.floor((this.player.x / (LEVEL_WIDTH - 200)) * 100));
    this.progress.setText(`${percent}%`);
    if (this.player.x >= LEVEL_WIDTH - 180) this.finish(true);
  }

  finish(won) {
    if (this.finished) return;
    this.finished = true;
    this.player.setVelocity(0, 0);
    this.scene.start('End', { won });
  }
}
