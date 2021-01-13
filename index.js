let colors = ["red", "yellow", "blue", "green"];
let gamePattern = [];
let userPattern = [];
let level = 1;
function randomColor() {
    return colors[Math.floor((Math.random()) * 4)];
}

function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () { $("#" + color).removeClass("pressed"); }, 100);

}

function playSound(color) {
    let audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function gamePatternFunc() {
    gamePattern.push(randomColor());
    if (level === 1) {
        $("h1").text("Level 1");
    }
    for (let i = 0; i < gamePattern.length; i++) {
        animatePress(gamePattern[i]);
        playSound(gamePattern[i]);
    }
}

$(document).on("keypress", function () {
    if (level === 1) {
        gamePatternFunc();
    }



});
function gameOver() {
    $("h1").text("Game Over");
    $("body").addClass("game-over");
    setTimeout(function () { $("body").removeClass("game-over"); }, 100);
    $("body").addClass("game-over");
    setTimeout(function () { $("body").removeClass("game-over"); }, 1000);

    level = 1;
    gamePattern = [];
    userPattern = []
    setTimeout(function () { $("h1").text("Press any key to start the game"); }, 1000);

}

function checkAnswer() {
    if (JSON.stringify(gamePattern) == JSON.stringify(userPattern)) {
        level++;
        gamePatternFunc();
        $("h1").text("Level " + level);
        userPattern = [];
    }
    else {

        gameOver();
    }

}


$(".btn").on("click", function () {
    animatePress($(this).attr("id"));
    playSound($(this).attr("id"));
    userPattern.push($(this).attr("id"));
    userPattern = userPattern.filter(Boolean);
    let count=0;count++;
    if (gamePattern.length === userPattern.length) {
        checkAnswer();
        count=0;
    }
    else {
        for (let x = 0; x < count; x++) {
            if(gamePattern[x]!=userPattern[x]){
                gameOver();
            }
            else{
                $("h1").text("Level " + level);
            }


        }

    }

});
