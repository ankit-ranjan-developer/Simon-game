var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keydown(function()
{
    if(!started)
    {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
});

function nextSequence() {
  userClickedPattern = [];
  level = level + 1;
  $("#level-title").text("Level " + level);
  
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playAudio(randomChosenColour);
  
}

$(".btn").click(function()
{
    var userChosenColour = $(this).attr("id");

    playAudio(userChosenColour);
    animatePress(userChosenColour);

    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },100);
        }
    }

    else{
        playAudio("wrong");

        $("body").addClass("game-over");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
    }
}


function playAudio(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function () {
    $("#" + name).removeClass("pressed");
  }, 100);
}

function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
}



