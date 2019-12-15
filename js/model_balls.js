function createBall() {
  var ballModel = new THREE.Object3D();
  var ball = new THREE.Mesh(new THREE.SphereGeometry(1,32,32),
                            palatte.leather);
  ball.scale.x = 1.5;
  ballModel.add(ball);
  var ballShadow = createBallShadow();
  var ballObj = ballObject(ball, ballShadow);
  return ballObj;
  //return ballModel;
}

function createBallShadow(){
  var ballShadowModel = new THREE.Object3D();
  var ballShadowMaterial = new THREE.MeshLambertMaterial({
    color: '0x0000000',
    transparent: true,
    opacity: .5
  });
  var ball_shadow = new THREE.Mesh(new THREE.SphereGeometry(.75,64,32),
                            ballShadowMaterial);

  ballShadowModel.add(ball_shadow);
  ball_shadow.scale.x =0.001;
  ball_shadow.scale.y =0.001;
  ball_shadow.scale.z =0.001;
  ball_shadow.position.y = -28.5;
  ball_shadow.rotation.z=Math.PI/4;
  ball_shadow.rotation.y =Math.PI/2;
  ball_shadow.rotation.x =Math.PI/4;

  return ballShadowModel;
}

function ballObject(ball, shadow){
    var ball_obj={
      ball: ball,
      shadow: shadow
    };
    return ball_obj;
}

function randomizeBallPos(ball_obj){
  var random = Math.random();
  var randpos = Math.random();
  if (random < .5){
    ball_obj.ball.position.x = Math.random() * 70;
    if(random <.25){
     ball_obj.ball.position.z = Math.random()*75;
    }
    else {
      ball_obj.ball.position.z = Math.random()*-45;
    }
  }
  else{
    ball_obj.ball.position.x = Math.random() * -70;
    if(random < .75){
      ball_obj.ball.position.z = Math.random()* -45;
    }
    else{
      ball_obj.ball.position.z = Math.random()*75;
    }
}
  ball_obj.shadow.position.x =ball_obj.ball.position.x;
  ball_obj.shadow.position.z = ball_obj.ball.position.z;
}

function populateBalls(number, populationRate){
  var balls = [];
  for(var i = 0; i < number; i++){
    var ball_obj = createBall();
    randomizeBallPos(ball_obj);
    ball_obj.ball.rotation.z = -Math.PI/4;
  	ball_obj.ball.position.y = 50 + populationRate*i;


    balls.push(ball_obj);
  }
 return balls;
}
