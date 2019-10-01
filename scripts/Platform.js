position = 0;
var intervalPlatform = setInterval(function() {
    console.log(localStorage.getItem("pause"));
    
    if(localStorage.getItem("pause")=="false"){
        position-=1;
        $(".platform").css({ "background-position": +position + "px 0px" })
    }
    else{
       position=0;
       $(".platform").css({ "background-position": +position + "px 0px" })
    }
    
}, 0);