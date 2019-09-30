var bgm = "../resources/sound/bgm.mp3";
var sword = "../resources/sound/sword.mp3"

var bgmAudioObject = new Audio(bgm);

function playBgm(){
   bgmAudioObject.play()
}

function playSword(){
    var swordAudioObject = new Audio(bgm);
    swordAudioObject.play();
}

function muteAll(){
    if(bgmAudioObject.muted){
        bgmAudioObject.muted=false;
        $("#mute-button").text("MUTE")
    }
    else{
    bgmAudioObject.muted=true;
    $("#mute-button").text("UNMUTE")
    }
}

