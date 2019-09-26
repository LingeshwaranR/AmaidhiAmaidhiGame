// position = 0;
// var intervalPlatform = setInterval(function() {
//     position -= 0.1;
//     $(".background-move").css({ "background-position": +position + "px 0px" })
// }, 10);
var sun= document.getElementsByClassName("background-sun")[0];
var container= document.getElementsByClassName("background-container")[0];
var toggle=1;


function PauseBackground() {
    // runs every 60 sec and runs on init.
    if(toggle ===1){
    sun.style.animationPlayState ="paused";
    container.style.animationPlayState ="paused";

    toggle=0;
        console.log("Paused");}
        else{
            setTimeout(function(){ 
                sun.style.animationPlayState ="running";
                container.style.animationPlayState ="running";
    
                toggle=1;
                    console.log("Running");

             }, 8000);          
        }
}

PauseBackground();
setInterval(PauseBackground, 16*1000);