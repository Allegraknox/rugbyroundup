
function createHero(modelTypePalatte) {
   var hero = new THREE.Object3D();

//child 0
    var torso = new THREE.Mesh(new THREE.CubeGeometry(1.05, 1.1, .5),
    modelTypePalatte.shirt[playerJersey]);
    torso.position.y = 0.5;  // move base up to origin

//child 1
   var rightLeg = leg(modelTypePalatte);
   rightLeg.position.y = -.3;  // move top of leg to bottom of body
   rightLeg.position.x = -.25;
//child 2
   var leftLeg = leg(modelTypePalatte);
   leftLeg.position.y = -.3;  // move top of leg to bottom of body
   leftLeg.position.x = .25;

//child 3
   var rightArm = arm(modelTypePalatte);
   rightArm.position.x = -.6;
   rightArm.position.y = .75;
   rightArm.rotation.z = (-.3);


//child 4
   var leftArm = arm(modelTypePalatte);
   leftArm.rotation.z = (.3);
   leftArm.position.x = .6;
   leftArm.position.y = .75;
//child 5
   var head = makeHead();
   head.position.y = 1.55;

//child 6
   var hair = makeHair();
   hair.position.y = 1.55;

   hero.add(torso);
   hero.add(rightLeg);
   hero.add(leftLeg)
   hero.add(rightArm);
   hero.add(leftArm);
   hero.add(head);
   hero.add(hair);
   return hero;
}

function leg(modelTypePalatte){
  var leg = new THREE.Object3D();
  leg.add( new THREE.Mesh(
     new THREE.CylinderGeometry(.3,.3,.5,8,1),
     palatte.black
   ));

  var calf = (new THREE.Mesh(
    new THREE.CylinderGeometry(.2,.2,.25,8,1),
    playerSkin
  ));
  calf.position.y = -.35;
  leg.add(calf);

  var sock = (new THREE.Mesh(
    new THREE.CylinderGeometry(.2,.2,.55,8,1),
    modelTypePalatte.lowerLeg
  ));
  sock.position.y = -.75;
  leg.add(sock);
  var foot = new THREE.Mesh(new THREE.CubeGeometry(.45, .25, .5),
      palatte.black);
  foot.position.y = -1.1;
  foot.position.z = .05;
  leg.add(foot);
  return leg;
}


function arm(modelTypePalatte){
  var arm = new THREE.Object3D();

  var sleeve = (new THREE.Mesh(
    new THREE.CylinderGeometry(.2,.2,.35,8,1),
    modelTypePalatte.upperArm
  ));
  arm.add(sleeve);

  var forearm = (new THREE.Mesh(
    new THREE.CylinderGeometry(.15,.15,.8,8,1),
    playerSkin
  ));
  forearm.position.y = -.45;
  arm.add(forearm);

  var hand = new THREE.Mesh(new THREE.SphereGeometry(.15,32,32),
                            playerSkin
                          );
  hand.position.y = -.85;
  arm.add(hand);

  return arm;
}

function makeHead(){
  var head = new THREE.Object3D();

  var face = new THREE.Mesh(new THREE.SphereGeometry(.5,32,32),
                            playerFace
                          );
  head.add(face);
  var eye = new THREE.Mesh(new THREE.SphereGeometry(.05,32,32),
                            palatte.black
                          );
  eye.position.z = .45;
  eye.position.x = .2;
  head.add(eye);

  eye = new THREE.Mesh(new THREE.SphereGeometry(.05,32,32),
                            palatte.black
                          );
  eye.position.z = .45;
  eye.position.x = -.2;
  head.add(eye);

  var nose = new THREE.Mesh(new THREE.SphereGeometry(.05,32,32),
                            playerSkin
                          );
  nose.position.z = .5;
  nose.position.y = -.1;
  head.add(nose);
  return head;
}

function makeHair(){
    var hair = new THREE.Object3D();
      var tail = new THREE.Mesh(
         new THREE.CubeGeometry(.5,.5,.5),
         playerHair
         );
         tail.position.y = .5;
         tail.position.z = -.5;
     var tail2 = new THREE.Mesh(
        new THREE.CubeGeometry(.35,.35,.35),
        playerHair
        );
        tail2.position.y = .1;
        tail2.position.z = -.7;
    var tail3 = new THREE.Mesh(
       new THREE.CubeGeometry(.2,.2,.2),
       playerHair
       );
       tail3.position.y = -.15;
       tail3.position.z = -.85;

    hair.add(tail);
    hair.add(tail2);
    hair.add(tail3);
    return hair;
}
