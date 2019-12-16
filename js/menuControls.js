function pause(){
  if(titleShowing == false){
    var pauseScreen = document.getElementById("pauseScreen");
    paused = !paused;
    if(paused){
        pauseScreen.innerHTML = "<h1>GAME PAUSED</h1><h5>Use arrowkeys to move. Spacebar to pause/unpause. Push the kids so they don't get hit by the balls!</h5><div id='innerPause'></div>";
        var innerPause = document.getElementById('innerPause');
        innerPause.innerHTML = "<div id='returnTitle'>Return to title screen</div><div id='restartLvl'>Restart level</div>";
        document.getElementById('returnTitle').addEventListener("click", showTitleScreen), false;
        document.getElementById('restartLvl').addEventListener("click", function(){restartLevel(0);}, false);
    }
    else{
        pauseScreen.innerHTML = "";
    }
  }
}

function restartLevel(score){
  //reset scoreboard
  currentScore = score;
  ballsLeft = currentLevel.numBalls;
  scoreboard.innerHTML = "<h1>RUGBY ROUNDUP</h1>\n<h2>Balls remaining: "+ ballsLeft+"</h2>\n<h3>Score: "+ currentScore + "<h5>Press spacebar to pause.</h5>";

  //repopulate balls
  for( var i =0; i< Balls.length; i++){
    scene.remove(Balls[i].ball);
    scene.remove(Balls[i].shadow);
  }
  Balls = null;
  Balls = populateBalls(currentLevel.numBalls, currentLevel.populationRate);
  addKids();
  updateMats();
  //resume level
  pause();
}

var titleShowing;
function showTitleScreen(){
  titleShowing = true;
  paused = true;

  if(models[HERO] !== null){
      scene.remove(models[HERO]);
  }

  if(winShowing)
  document.getElementById("youWinWrapper").innerHTML = "";

  document.getElementById("scoreboard").innerHTML = "";
  document.getElementById("pauseScreen").innerHTML = "";
  var titleScreenWrapper = document.getElementById("startScreenWrapper");
  titleScreenWrapper.innerHTML = "<div id='startScreen'></div>";
  var titleScreen = document.getElementById("startScreen");
  var titleText = "<h1 id='title'>RUGBY ROUNDUP</h1><h2>Catch the balls and make sure the children don't get hit!</h2>"
  titleText += "<h3>Use the arrow keys to move, spacebar to pause.</h3>";
  titleText += "<p id = 'chooseChar'>Pick a character to start:</p>";
  titleText += "<div id='char1' class='profPic'></div><div id='char2' class='profPic'></div><div id='char3' class='profPic'></div>";
  titleText += "<div id='char4' class='profPic'></div><div id='char5' class='profPic'></div><div id='char6' class='profPic'></div><div id='char7' class='profPic'></div>";
  titleText += "<h3>Faster players move quickly, but are harder to control precisely.</h3>"
  titleScreen.innerHTML = titleText;
  var char1 = document.getElementById('char1');
  var char2 = document.getElementById('char2');
  var char3 = document.getElementById('char3');
  var char4 = document.getElementById('char4');
  var char5 = document.getElementById('char5');
  var char6 = document.getElementById('char6');
  var char7 = document.getElementById('char7');

  char1.innerHTML = '<img src= "images/allegra.png"><p class="name">Allegra "Legs"</p><h6>(Kinda fast)</h6>';
  char2.innerHTML = '<img src= "../images/emma.png"><p class="name">Emma</p><h6>(Pretty fast)</h6>';
  char3.innerHTML = '<img src= "../images/val.png"><p class="name">Val</p><h6>(Very fast)</h6>';
  char4.innerHTML = '<img src= "../images/nicole.png"><p class="name">Nicole</p><h6>(Pretty fast)</h6>';
  char5.innerHTML = '<img src= "../images/tubes.png"><p class="name">Hannah "Tubes"</p><h6>(Fastest)</h6>';
  char6.innerHTML = '<img src= "../images/shelley.png"><p class="name">Shelley</p><h6>(Very fast)</h6>';
  char7.innerHTML = '<img src= "../images/anna.png"><p class="name">Anna</p><h6>(Kinda fast)</h6>';

  char1.addEventListener("click", function(){startGame("allegra");}, false);
  char2.addEventListener("click", function(){startGame("emma");}, false);
  char3.addEventListener("click", function(){startGame("val");}, false);
  char4.addEventListener("click", function(){startGame("nicole");}, false);
  char5.addEventListener("click", function(){startGame("tubes");}, false);
  char6.addEventListener("click", function(){startGame("shelley");}, false);
  char7.addEventListener("click", function(){startGame("anna");}, false);
}

var playerSkin;
var playerHair;
var playerFace;
var playerJersey = 0;

function startGame(name){
    levelNum = 0;
    currentLevel = levels[levelNum];
  switch( name ) {
    case "allegra":
    playerSkin = palatte.skin[LIGHT];
    playerHair = palatte.hair[BROWN];
    playerFace = palatte.playerFaces[0];
    playerJersey = 0;
    levels[0].heroSpeed = 1.2;
    break;
    case "emma":
    playerSkin = palatte.skin[MEDIUM];
    playerHair = palatte.hair[BLONDE];
    playerFace = palatte.playerFaces[1];
    playerJersey = 1;
    levels[0].heroSpeed = 1.4;
    break;
    case "val":
    playerSkin = palatte.skin[LIGHT];
    playerHair = palatte.hair[GINGER];
    playerFace = palatte.playerFaces[2];
    playerJersey = 2;
    levels[0].heroSpeed = 1.5;
    break;
    case "nicole":
    playerSkin = palatte.skin[MEDIUM];
    playerHair = palatte.hair[BROWN];
    playerFace = palatte.playerFaces[3];
    playerJersey = 3;
    levels[0].heroSpeed = 1.4;
    break;
    case "tubes":
    playerSkin = palatte.skin[LIGHT];
    playerHair = palatte.hair[BLONDE];
    playerFace = palatte.playerFaces[4];
    playerJersey = 4;
    levels[0].heroSpeed = 1.7;
    break;
    case "shelley":
    playerSkin = palatte.skin[MEDIUM];
    playerHair = palatte.hair[DARK];
    playerFace = palatte.playerFaces[5];
    playerJersey = 5;
    levels[0].heroSpeed = 1.5;
    break;
    case "anna":
    playerSkin = palatte.skin[LIGHT];
    playerHair = palatte.hair[BROWN];
    playerFace = palatte.playerFaces[6];
    playerJersey = 6;
    levels[0].heroSpeed = 1.2;
    break;
  }
  models[HERO] = createHero(heroPalatte);
  threadNum = 0;
  framenumber = 0;
  scene.add(models[HERO]);
  models[HERO].scale.x = 3;
  models[HERO].scale.y = 3;
  models[HERO].scale.z = 3;
  models[HERO].position.y = -24.5;
  models[HERO].position.z = -10;

  document.getElementById("startScreen").innerHTML = "";
  document.getElementById("startScreenWrapper").innerHTML = "";
  titleShowing = false;
  restartLevel(0);
}

function levelUp(){
    paused = true;
    levelNum++;//simply increment the level and update currentLevel
    document.getElementById("scoreboard").innerHTML="";
    if(levelNum == MAXLEVEL){
        youWin();
    }
    else{
        currentLevel = levels[levelNum];
        var levelup = document.getElementById('levelUpWrapper');
        levelup.innerHTML = "<div id='levelUp'><h1>LEVEL UP</h1><h2>Current Score: " +currentScore+"</h2><h2>Catch " + currentLevel.numBalls + " balls and protect the " + currentLevel.numKids + " kids!</h2><h5>Level " + (levelNum+1) + " will start in 5 seconds.</div>";
        setTimeout(notification, 5000, levelup);
    }
}

function notification(element){
    element.innerHTML = "";
    restartLevel(currentScore);
}

var winShowing = false;
function youWin(){
    winShowing = true;
    paused = true;
    document.getElementById("scoreboard").innerHTML = "";
    var options = "<div id='returnTitle'>Return to title screen</div>"
    var winScreen = document.getElementById("youWinWrapper");
    var winText = "<h1 id='title'>YOU WON!!!</h1><h2>Congratulations on beating our game!</h2><h2>Your final score was " + currentScore +".</h2><h3>We hope you enjoyed playing :)</h3>";
    winScreen.innerHTML = "<div id='youWin'>" + winText + options + "</div>";
    document.getElementById('returnTitle').addEventListener("click", showTitleScreen), false;
}
