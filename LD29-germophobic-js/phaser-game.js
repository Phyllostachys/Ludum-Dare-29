/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var game = new Phaser.Game(800, 700, Phaser.AUTO, 'canvas-div', {preload: preload, create: create, update: update});
game.Stage.backgroundcolor = 0xFF12FF;
game.ScaleManager.pageAlignHorizontally = true;

function preload() {
    game.load.image('star', 'assets/star.png');
}

var cursors;
var somesprite;

function create() {
    // all setup code here
    somesprite = game.add.sprite(0, 0, 'star');
}

function update() {
    // called every frame
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        somesprite.x -= 4;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        somesprite.x += 4;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        somesprite.y -= 4;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
        somesprite.y += 4;
    }
}