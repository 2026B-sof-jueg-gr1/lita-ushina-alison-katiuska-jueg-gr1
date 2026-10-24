const config = { 
    type: Phaser.AUTO, width: 800, height: 600,
    physics: { default: 'arcade' },
    scene: { preload: preload, create: create, update: update } 
};
const game = new Phaser.Game(config);
let player, cursors, wasd;

function preload() {
    this.load.image('block', 'https://labs.phaser.io/assets/sprites/block.png');
}

function create() {
    player = this.physics.add.image(400, 300, 'block');
    player.setCollideWorldBounds(true);
    cursors = this.input.keyboard.createCursorKeys();
    wasd = this.input.keyboard.addKeys('W,A,S,D');
}

function update() {
    player.setVelocity(0);
    if (cursors.left.isDown || wasd.A.isDown) player.setVelocityX(-300);
    else if (cursors.right.isDown || wasd.D.isDown) player.setVelocityX(300);

    if (cursors.up.isDown || wasd.W.isDown) player.setVelocityY(-300);
    else if (cursors.down.isDown || wasd.S.isDown) player.setVelocityY(300);
}