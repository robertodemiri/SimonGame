var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".btn").click(function() {

  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  setTimeout(function() {
    $("#" + userChoosenColor).removeClass("pressed");
  }, 100);

  checkAnswer(userClickedPattern.length - 1);

});

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);
  // generates a random number
  var randomNumber = Math.floor((Math.random() * 4));
  // store the color in the randomChoosenColor variable
  var randomChoosenColor = buttonColours[randomNumber];
  // push the randomChoosenColor in the gamePattern array
  gamePattern.push(randomChoosenColor);
  // animate the button with randomChoosenColor
  $("#" + randomChoosenColor).fadeOut().fadeIn();
  // play the audio of the randomChoosenColor
  playSound(randomChoosenColor);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];

  $("h1").html("Game Over! Press any key to restart");
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

$(document).keypress(function() {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});
