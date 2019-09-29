var myGamePiece;
var myObstacles = [];

function startGame() {
    myGamePiece = new component(30, 30, "red", -10, 120,"character");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0].childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 10);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y,name) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.color = color;
    this.x = x;
    this.y = y;    
    this.update = function() {
        if(name!="character"){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
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
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
           $(".shinchan").removeClass("animate")
           $(".shinchan").addClass("move-up-and-down")
           setInterval(()=>{
           $(".shinchan").hide()
           },1000)
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
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        colors = ["red","green","blue","orange","violet"]
        minColorVal = 0;
        maxColorVal = 4;
        colorVal = Math.floor(Math.random()*(maxColorVal)+minColorVal);
        myObstacles.push(new component(15, x - height, colors[i], x+gap, 50,"obstacle"));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myGamePiece.newPos();    
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}

window.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case 65:
      if(myObstacles[0].color=="red"){
        var firstObstacle = myObstacles.shift()
        firstObstacle.x+=100;
      }
      break;
  
      case 83: 
      if(myObstacles[0].color=="green"){
        var firstObstacle = myObstacles.shift()
        firstObstacle.x+=100;
        }
      break;
  
      case 68: 
      if(myObstacles[0].color=="blue"){
        var firstObstacle = myObstacles.shift()
        firstObstacle.x+=100;
        }
      break;
  
        case 70:    
      if(myObstacles[0].color=="orange"){
        var firstObstacle = myObstacles.shift()
        firstObstacle.x+=100;   
        }
      break;
      case 32:
          $(".shinchan").addClass("jump")
          setInterval(()=>{
            $(".shinchan").removeClass("jump")
            },2000)
    }
  }, false);

