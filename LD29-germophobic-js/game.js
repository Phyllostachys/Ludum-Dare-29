/*
 * Ludum Dare 29
 * Team Confused Dog:
 *  - Jacob Shaffer - programming
 *  - Ed Keener - design
 *  - Alex Huston - art
 */

var canvas, stage;
var canvasWidth = 800, canvasHeight = 700;
var mouseX, mouseY;
var canvasOffsetX, canvasOffsetY;
var germWidth = germHeight = 15;
var germJiggle = 2;
var germSpeed = 1;
var germs = [];

(function init() {
    canvas = document.getElementById('gameCanvas');
    stage = new createjs.Stage(canvas);

    var bitmap = new createjs.Bitmap("background.png");
    
    var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    
    stage.addChild(bitmap);
    stage.update();
})();

function tick() {
    for (var germ in germs) {
        germs[germ].gContext.x += germs[germ].xDir + getRandomInt(-germJiggle, germJiggle);
        germs[germ].gContext.y += germs[germ].yDir + getRandomInt(-germJiggle, germJiggle);
        //console.log(germs[germ].gContext.x, germs[germ].gContext.y);

        // delete the germ if it gets past the borders
        if (germs[germ].gContext.x + (germWidth/2) < 0 ||
                germs[germ].gContext.x > canvasWidth ||
                germs[germ].gContext.y + (germHeight/2) < 0 ||
                germs[germ].gContext.y > canvasHeight)
        {
            stage.removeChild(germs[germ].gContext);
            delete germs[germ];
            console.log("germ deleted, yay!");
        }
    }
    
    stage.update();
}

createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener("tick", tick);