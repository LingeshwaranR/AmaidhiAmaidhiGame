var myGamePiece;
var myObstacles = [];
var pause = false;

function restartGame() {
    localStorage.setItem("pause", "false")
    location.reload()
}

function startGame() {
    localStorage.setItem("pause", "false")
    localStorage.setItem("gameOver", "false")
    $(".buttons").hide()
    $(".loading").show()
    setInterval(() => {
        $(".start").hide()
        $(".background-container").show()
        myGamePiece = new component(30, 30, "red", -10, 120, "character");
        myGameArea.start();
    }, 3000)
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0].childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 5);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, name) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.color = color;
    this.x = x;
    this.y = y;
    img = new Image();
    img.src = "resources/characters/shuriken.png"
    this.update = function() {
        if (name != "character") {
            ctx = myGameArea.context;
            // ctx.scale(2, 2);


            // draw color


            function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
                var rot = Math.PI / 2 * 3;
                var x = cx;
                var y = cy;
                var step = Math.PI / spikes;

                ctx.beginPath();
                ctx.moveTo(cx + 0.5, cy - outerRadius)
                for (i = 0; i < spikes; i++) {
                    x = cx + Math.cos(rot) * outerRadius;
                    y = cy + Math.sin(rot) * outerRadius;
                    ctx.lineTo(x + 0.5, y)
                    rot += step

                    x = cx + Math.cos(rot) * innerRadius;
                    y = cy + Math.sin(rot) * innerRadius;
                    ctx.lineTo(x, y)
                    rot += step
                }
                ctx.lineTo(cx + 0.5, cy - outerRadius);
                ctx.closePath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'black';
                ctx.fillStyle = color;
                ctx.stroke();

                ctx.fill();
            }

            drawStar(this.x, this.y + 75, 15, 15, 10)
                // ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    if (pause) {
        return;
    }
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            $(".shinchan").removeClass("animate")
            $(".shinchan").addClass("move-up-and-down")
            localStorage.setItem("gameOver", "true")
            setInterval(() => {
                $(".shinchan").hide()
                myGameArea.clear()
                setInterval(() => {
                    $(".background-container").hide()
                    if (localStorage.getItem("highScore") == undefined) {
                        localStorage.setItem("highScore", parseInt($("#score").text()))
                    } else {
                        if (localStorage.getItem("highScore") < parseInt($("#score").text())) {
                            localStorage.setItem("highScore", parseInt($("#score").text()))
                        }
                    }
                    $("#high-score").text(localStorage.getItem("highScore"))
                    $("#final-score").text($("#score").text())
                    $(".game-over").show()
                }, 1000)
            }, 2200)
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        height = 200;
        minGap = 15;
        maxGap = 200;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        colors = ["#eb4034", "#34eb40", "#3437eb", "#f29316"]
        minColorVal = 0;
        maxColorVal = 4;
        colorVal = Math.floor(Math.random() * (maxColorVal) + minColorVal);
        myObstacles.push(new component(15, x - height, colors[i], x + gap, 50, "obstacle"));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}

function clearmove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}

window.addEventListener('keydown', function(event) {
    if (localStorage.getItem("gameOver") == "true") {
        return;
    }
    var glow = document.getElementById("glow1");
    if(myObstacles[0].x<=130){
    switch (event.keyCode) {
        case 65:
            if (myObstacles[0].color == "#eb4034") {
                var firstObstacle = myObstacles.shift()
                firstObstacle.x += 100;
                playSound(sword)
                $("#score").text(parseInt($("#score").text()) + 1);

            }
            break;

        case 83:
            if (myObstacles[0].color == "#34eb40") {
                var firstObstacle = myObstacles.shift()
                firstObstacle.x += 100;
                playSound(sword)
                $("#score").text(parseInt($("#score").text()) + 1);
            }
            break;

        case 68:
            if (myObstacles[0].color == "#3437eb") {
                var firstObstacle = myObstacles.shift()
                firstObstacle.x += 100;
                playSound(sword)
                $("#score").text(parseInt($("#score").text()) + 1);
            }
            break;

        case 70:
            if (myObstacles[0].color == "#f29316") {
                var firstObstacle = myObstacles.shift()
                firstObstacle.x += 100;
                playSound(sword)
                $("#score").text(parseInt($("#score").text()) + 1);
            }
            break;
        case 32:
            $(".shinchan").addClass("jump")
            playSound(jump)
            setInterval(() => {
                $(".shinchan").removeClass("jump")
            }, 1100)
    }
}
}, false);

$("#pause").on("click", () => {
    document.getElementsByClassName("background-container")[0].style.backgroundColor = "#fff";
    document.getElementsByClassName("background-container")[0].style.opacity = 0.4;
    pause = true;
    localStorage.setItem("pause", "true")
    $(".shinchan").removeClass("animate")
    $("#pause").hide()
    $("#play").show()
})
$("#play").on("click", () => {
    document.getElementsByClassName("background-container")[0].style.backgroundColor = "#d4d4f7";
    document.getElementsByClassName("background-container")[0].style.opacity = 1;
    pause = false;
    localStorage.setItem("pause", "false")
    $(".shinchan").addClass("animate")
    $("#play").hide()
    $("#pause").show()
})

var jump = "jump.mp3"
var sword = "sword.mp3"

function playSound(path) {
    var audioObject = new Audio(path);
    audioObject.play();
}