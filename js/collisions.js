var childFell = false;


function intersect(a, b) {
	var bbox1 = new THREE.Box3().setFromObject(a);
	var bbox2 = new THREE.Box3().setFromObject(b);

	var bounds1 = {
		xMin: bbox1.min.x,
		xMax: bbox1.max.x,
		yMin: bbox1.min.y,
		yMax: bbox1.max.y,
		zMin: bbox1.min.z,
		zMax: bbox1.max.z,
	};

	var bounds2 = {
		xMin: bbox2.min.x,
		xMax: bbox2.max.x,
		yMin: bbox2.min.y,
		yMax: bbox2.max.y,
		zMin: bbox2.min.z,
		zMax: bbox2.max.z,
	};

	var collision = ( bounds1.xMin <= bounds2.xMax && bounds1.xMax >= bounds2.xMin ) &&
	( bounds1.yMin <= bounds2.yMax && bounds1.yMax >= bounds2.yMin) &&
	( bounds1.zMin <= bounds2.zMax && bounds1.zMax >= bounds2.zMin);

	return collision;
}

function checkCollisionChild(hero, children){

	var collision = false;
	for (var i = 0; i<children.length ; i++){

		collision = intersect(hero, children[i]);
		if(collision){
			handleChildCollision(hero, children[i], i);
			break;
		}
	}
}

function checkCollisionBalls(hero, balls){
	var collision = false;
	for (var i = 0; i<balls.length ; i++){

		collision = intersect(hero, balls[i].ball);

		if(collision){
			handleBallCollision(balls[i]);
			break;
		}
	}
}

function checkCollisionBallChild(balls, child, childNum){
	var collision = false;
	for (var i = 0; i<balls.length ; i++){

		collision = intersect(child, balls[i].ball);

		if(collision){
			handleBallChildCollision(child, childNum, balls[i]);
			//stopChildren(child, i);
			break;
		}
	}


}

function handleBallChildCollision(child, index,ball){
	ball.ball.position.y = currentLevel.populationRate + 50;
	randomizeBallPos(ball);
	updateScore(false);
	stopChildren(child, index);
}

function handleBallCollision(ball){
	//ball.dispose(); //need to implement buffer geometry to activate
	updateScore(true);
	ball.ball.position.z = 1000;
	ball.shadow.position.z = 1000;
}

function handleChildCollision(hero, child, index){

	var bumpSize = 3;
	var xmin = -75 +bumpSize;
	var xmax = 75 + bumpSize;
	var zmin = -45+bumpSize;
	var zmax = 72+bumpSize;
	changeXRoute(index);
	changeZRoute(index);

	if(hero.position.x < child.position.x){
		if(child.position.x < xmax)
		child.position.x += bumpSize;

	}
	if(hero.position.x > child.position.x){
		if(child.position.x > xmin)
		child.position.x -= bumpSize;
	}
	if(hero.position.z < child.position.z){
		if(child.position.z < zmax)
		child.position.z += bumpSize;
	}
	if(hero.position.z > child.position.z)
	if(child.position.z > zmin){
		child.position.z -=bumpSize;
	}

}

function checkCollisions(hero, balls, children, threadNum){
	checkCollisionBalls(hero, balls);
	checkCollisionChild(hero, children);
	for (var i=0; i<children.length; i++){
		checkCollisionBallChild(balls, children[i],i);
	}
}

function updateScore(caught){
	if(!caught){
		currentScore-=10;
		//ballsLed
	}
	//otherwise it means the hero caught it, so detract score
	else{
		ballsLeft --;
		currentScore += 5;
	}
	scoreboard.innerHTML = "<h1>RUGBY ROUNDUP</h1>\n<h2>Balls remaining: "+ ballsLeft+"</h2>\n<h3>Score: "+ currentScore + "<h5>Spress spacebar to pause.</h5>";
	if(ballsLeft == 0){
		levelUp();
	}
}
