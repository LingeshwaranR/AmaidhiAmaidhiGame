var sun = document.getElementsByClassName("background-sun")[0];
var container = document.getElementsByClassName("background-container")[0];
var toggle = 1;

function PauseBackground() {
   
    if (toggle === 1) {
        sun.style.animationPlayState = "paused";
        container.style.animationPlayState = "paused";

        toggle = 0;
    }
    else {
        setTimeout(function () {
            sun.style.animationPlayState = "running";
            container.style.animationPlayState = "running";

            toggle = 1;


        }, 8000);
    }
}

PauseBackground();
setInterval(PauseBackground, 16 * 1000);