var canvasWidth = 800, canvasHeight = 700;
var mouseX, mouseY;
var canvasOffsetX, canvasOffsetY;
var germWidth = germHeight = 15;
var germJiggle = 2;
var germSpeed = 1;
var germs = [];

// setup Pixi.js
var canvas = document.getElementById("gameCanvas");
//var canvasContext = canvas.getContext("2d");

var renderer = PIXI.autoDetectRenderer(canvasWidth, canvasHeight, canvas); // create a renderer instance.
var stage = new PIXI.Stage(0xFF0000); // create an new instance of a pixi stage
stage.addChild(PIXI.Sprite.fromImage("assets/background.png"));
document.body.appendChild(renderer.view); // add the renderer view element to the DOM

// output mouse x y position to the screen
//var mouseXYText = PIXI.Text(mouseX + " " + mouseY);
//mouseXYText.position.x = 10;
//mouseXYText.position.y = 10;
//stage.addChild(mouseXYText);

//stage.CanvasRenderer.view.getContext('2d');
//var backgroundCanvas = document.createElement("backgroundCanvas");
//var context = backgroundCanvas.getContext("2d");
//var img = new Image();
//img.src = "assets/background.png";


$(canvas).click(function(e) {
    mouseX = e.pageX - $(canvas).offset().left;
    mouseY = e.pageY - $(canvas).offset().top;
});

$(canvas).mousemove(function(e) {
    mouseX = e.pageX - $(canvas).offset().left;
    mouseY = e.pageY - $(canvas).offset().top;

    // Get the CanvasPixelArray from the given coordinates and dimensions.
    console.log(canvasContext.getImageData(mouseX, mouseY, 1, 1).data);
});

setInterval(function() {
    generateGerms(15, 1);
    //setTimeout(this, 5000);
}, 5000);

requestAnimFrame(animate);
function animate()
{
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

    requestAnimFrame(animate);

    // render the stage  
    renderer.render(stage);
}

/************* Aux Functions *************/
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// determine direction of spawned germ
function getOrganDirection(randNum) {
    switch (randNum) {
        case 1: // left kidney
            return {x: -germSpeed, y: germSpeed - 0.1};
        case 2: // liver
            return {x: -germSpeed, y: 0};
        case 3: // left lung
            return {x: -germSpeed, y: -germSpeed + .5};
        case 4: // brain
            return {x: -0.25, y: -germSpeed};
        case 5:
            return {x: germSpeed, y: -germSpeed};
        case 6:
            return {x: germSpeed, y: 0};
        case 7: // right kidney
            return {x: germSpeed, y: germSpeed - 0.4};
        default:
            return {x: 0, y: 0};
    }
}

function generateGerms(number, difficulty) {
    var direction = getOrganDirection(getRandomInt(1, 7));
    for (i = 0; i < number; i++) {
        // create new germ
        var newGerm = PIXI.Sprite.fromImage("assets/flu.png");
        newGerm.anchor.x = newGerm.anchor.y = 0.5;
        newGerm.x = canvasWidth / 2 - 33;
        newGerm.y = canvasHeight / 2 - 3;
        newGerm.width = germWidth;
        newGerm.height = germHeight;

        //var direction = getOrganDirection(getRandomInt(1, 7));
        stage.addChild(newGerm);//, germs.length);
        germs[germs.length] =
                {
                    xDir: direction.x,
                    yDir: direction.y,
                    gContext: newGerm
                };
    }
}