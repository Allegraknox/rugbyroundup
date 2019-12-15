var moving = [];
var trackPad =[];
var xdirection = []; //ONE FOR EACH CHILD
var zdirection = [];
var standing = [];

function stopChildren(child, childIndex){
  moving[childIndex] = false;
  standing[childIndex] = false;
  child.children[1].rotation.x = 0;
  child.children[2].rotation.x = 0;
  animateChildren(child, false);
  setTimeout(resumeChildren, 3000, child, childIndex);
}

function changeZRoute(index){
  zdirection[index] = !zdirection[index];
}

function changeXRoute(index){
  xdirection[index] = !xdirection[index];
}

function resumeChildren(child, childIndex){
  xdirection[childIndex] = true;
  zdirection[childIndex] = true;
  standing[childIndex] =true;
  moving[childIndex] = true;
  animateChildren(child, standing[childIndex]);
}

function moveChildren(children){
      for(var i=0; i<children.length; i++){
        animateChildren(children[i], standing[i]);
        var speed = currentLevel.childSpeed;
        if (moving[i]){
        var random = Math.random();
        if(trackPad[i] < currentLevel.pathLength)  {
          if(random < .05){
            changeZRoute(i);
          }
          moveX(children[i], i, speed);
          updateTrackPad(i);
        }
        else{
          if(random > .75 && trackPad[i] > 1.75 * currentLevel.pathLength){
            changeZRoute(i);
            trackPad[i] = 0;
            moveX(children[i], i, speed);
          }
          moveZ(children[i], i,  speed);
          updateTrackPad(i);
        }
      }
    }
}

function updateTrackPad(i){
  trackPad[i] = trackPad[i]+1;
    if (trackPad[i] > currentLevel.pathLength*2){
      trackPad[i] = 0;
      var random = Math.random() * Math.random();
        if (random <= .25){
          changeXRoute(i);
          changeZRoute(i);
        }
        if (random >= .75){
          changeXRoute(i);
          changeZRoute(i);
        }
    }
}

function moveX(child, index, speed){
  var left_permitted = child.position.x > -75;
  var right_permitted = child.position.x < 75;

  if(xdirection[index]){
    if(right_permitted){
      child.position.x += speed;
    }
    else{
      changeXRoute(index);
      trackPad[index] = 0;
    }
  }

  else{
    if(left_permitted){
      child.position.x -= speed;
    }
    else{
      changeXRoute(index);
      trackPad[index] = 0;
    }
  }
}

function moveZ(child, index, speed){
  var zmin = -45;
  var zmax = 72;

  var down_permitted = child.position.z > -45;
  var up_permitted = child.position.z < 72;


  if(zdirection[index]){
    if(up_permitted){
      child.position.z += speed;
    }
    else{
      changeZRoute(index);
      trackPad[index] = 0;
    }
  }
  else{
    if(down_permitted){
      child.position.z -= speed;
    }
    else{
      changeZRoute(index);
      trackPad[index] = 0;
    }
  }
}
