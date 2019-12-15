var framenumber;

var checked;
var character;
var character1;
var threadNum;

var leg1;
var leg2;
var arm1;
var arm2;
var hair;

var cleg1;
var cleg2;
var carm1;
var carm2;
var chair;

var count; //for hero frame number
var count2; //for child frame number
var speed = .05;
var speed2 = .06;

function animateHero(char, animating){
  character = char;
  checked = animating;
  threadNum++;
  if(threadNum === 1){
    leg1 = character.children[1];
    leg2 = character.children[2];
    arm1 = character.children[3];
    arm2 = character.children[4];
    hair = character.children[6];
    doFrame();
  }
}

function animateChildren(char, animating){
    character1 = char;
    cleg1 = character1.children[1];
    cleg2 = character1.children[2];
    carm1 = character1.children[3];
    carm2 = character1.children[4];
    chair = character1.children[6];

    character1.rotation.z= 0;
    character1.rotation.x= 0;
    character1.position.y = -26;

    if(animating){
      updateFrameChild();
    }
    else{
      stopAnimatingChild();
    }

}

function stopAnimatingChild(){
  cleg1 = character1.children[1];
  cleg2 = character1.children[2];
  carm1 = character1.children[3];
  carm2 = character1.children[4];
  chair = character1.children[6];

	character1.rotation.z = Math.PI/2;
  // cleg1.rotation.x = 0;
  // cleg2.rotation.x = 0;
  // carm1.rotation.x = 0;
  // carm2.rotation.x = 0;
  character1.rotation.x = -Math.PI/2;
  character1.position.y = -28;
}

//--------------------------- animation support -----------------------------------

/* This function runs the animation by calling updateForFrame().
* Finally, it arranges for itself to be called again to do the next frame.  When the
* value of animating is set to false, this function does not schedule the next frame,
* so the animation stops.
*/
var framenumber = 0;
function doFrame() {
  controls.update();
  if (checked){
    updateForFrame();
    framenumber++;
  }
  requestAnimationFrame(doFrame);
}

function updateForFrame() {
  //walking animation
  count = framenumber%60
  if(count < 15){
    leg1.rotation.x -= speed;
    leg2.rotation.x += speed;
    arm1.rotation.x += speed2;
    arm2.rotation.x -= speed2;
    hair.children[0].position.y += .004;
    hair.children[1].position.y += .003;
    hair.children[2].position.y += .002;

  }
  else if(count < 30){
    leg1.rotation.x += speed;
    leg2.rotation.x -= speed;
    arm1.rotation.x -= speed2;
    arm2.rotation.x += speed2;
    hair.children[0].position.y -= .004;
    hair.children[1].position.y -= .003;
    hair.children[2].position.y -= .002;
  }
  else if (count < 45){
    leg1.rotation.x += speed;
    leg2.rotation.x -= speed;
    arm1.rotation.x -= speed2;
    arm2.rotation.x += speed2;
    hair.children[0].position.y += .004;
    hair.children[1].position.y += .003;
    hair.children[2].position.y += .002;
  }
  else{
    leg1.rotation.x -= speed;
    leg2.rotation.x += speed;
    arm1.rotation.x += speed2;
    arm2.rotation.x -= speed2;
    hair.children[0].position.y -= .004;
    hair.children[1].position.y -= .003;
    hair.children[2].position.y -= .002;
  }
}

function updateFrameChild() {
  speed=.03;
  speed2 = .03;
  //walking animation
  count2 = childfn%60
  if(count2 < 15){
    cleg1.rotation.x -= speed;
    cleg2.rotation.x += speed;
    carm1.rotation.x += speed2;
    carm2.rotation.x -= speed2;
    chair.children[0].position.y += .004;
    chair.children[1].position.y += .003;
    chair.children[2].position.y += .002;

  }
  else if(count2 < 30){
    cleg1.rotation.x += speed;
    cleg2.rotation.x -= speed;
    carm1.rotation.x -= speed2;
    carm2.rotation.x += speed2;
    chair.children[0].position.y -= .004;
    chair.children[1].position.y -= .003;
    chair.children[2].position.y -= .002;
  }
  else if (count2 < 45){
    cleg1.rotation.x += speed;
    cleg2.rotation.x -= speed;
    carm1.rotation.x -= speed2;
    carm2.rotation.x += speed2;
    chair.children[0].position.y += .004;
    chair.children[1].position.y += .003;
    chair.children[2].position.y += .002;
  }
  else{
    cleg1.rotation.x -= speed;
    cleg2.rotation.x += speed;
    carm1.rotation.x += speed2;
    carm2.rotation.x -= speed2;
    chair.children[0].position.y -= .004;
    chair.children[1].position.y -= .003;
    chair.children[2].position.y -= .002;
  }
}
