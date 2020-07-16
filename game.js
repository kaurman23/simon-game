var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[]

var started=false;
var level=0;

$(document).keydown(function(){

  if(!started)
  {
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
  }

})

$(".btn").on("click",function(){
  var userChosenColor=$(this).attr('id');
  //console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswers(userClickedPattern.length-1);
})

function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  var r=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[r];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function checkAnswers(currentLevel)
{
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
  //  console.log("Right");
    if(userClickedPattern.length==gamePattern.length)
    {

      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}
function startOver()
{
  level=0;
  gamePattern=[];
  userClickedPattern=[];
  started=false;
}
function playSound(name)
{
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}
