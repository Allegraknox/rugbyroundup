function makeScene(){
	// SCENE
	scene = new THREE.Scene();

	// CAMERA
	var SCREEN_WIDTH = window.innerWidth-7, SCREEN_HEIGHT = window.innerHeight-7;
	var VIEW_ANGLE = 50, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 1, FAR = 350;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,60,168);
	camera.lookAt(scene.position);

	// RENDERER
	if ( Detector.webgl )
	renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
	renderer = new THREE.CanvasRenderer();
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'ThreeJS' );
	container.appendChild( renderer.domElement );
	// EVENTS
	THREEx.WindowResize(renderer, camera);
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	// CONTROLS
	controls = new THREE.OrbitControls( camera, renderer.domElement );
}

function makeStats(){
	// STATS
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );
}

function makeLight(){
	// LIGHT
	var light = new THREE.HemisphereLight(0xffffff , 0xffff0b, .3);
	light.position.x = 0;
	light.position.y = 100;
	light.position.z = 10;

	var shadowLight = new THREE.DirectionalLight(0xffffff, .5);
	shadowLight.position.set(0, 10, -2);
	scene.add(shadowLight);

	var backLight = new THREE.DirectionalLight(0xffffff, 1);
	backLight.position.set(-50, 50, 50);
	scene.add(backLight);
	scene.add(light);
}

function makeSkybox(){
	var skyGeometry = new THREE.SphereGeometry( 135,25, 25 );
	var texture = new THREE.ImageUtils.loadTexture('images/field/academy_field_copy.jpg');
	var skyMaterial =  new THREE.MeshBasicMaterial({
		map:	texture,
		side: THREE.BackSide	} );
		var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
		scene.add( skyBox );
		skyBox.rotation.y = Math.PI/4;
	}

	//this function models the pitch, the trees, and the uprights (all non-moving models.)
	function makeFloor(){
		//FIELD
		var floorTexture = new THREE.ImageUtils.loadTexture( 'images/field/pitch.png' );
		var floorMaterial = new THREE.MeshLambertMaterial( {map: floorTexture, side: THREE.BackSide } );
		var floorGeometry = new THREE.PlaneGeometry(190, 120, 10, 10);
		var floor = new THREE.Mesh(floorGeometry, floorMaterial);
		floor.position.z = 15;
		floor.position.y = -29.0000001;
		floor.rotation.x = Math.PI/2;
		scene.add(floor);

		//extended floor
		var extendFloorGeometry = new THREE.PlaneGeometry(200,200,10,10);
		var extendFloorMaterial = palatte.green;//{ map: extendFloorTexture, side: THREE.BackSide }
		var extendFloor = new THREE.Mesh(extendFloorGeometry, extendFloorMaterial);
		extendFloor.position.y = -30.1;
		extendFloor.position.z = -10;
		extendFloor.rotation.x = -Math.PI/2;
		scene.add(extendFloor);

		var post = createUprights();
		post.scale.x = 5;
		post.scale.y = 5;
		post.scale.z = 5;
		post.position.y =-25;
		post.rotation.y = Math.PI/2;

		var Uprights = [post, post.clone()];
		scene.add(Uprights[0]);
		Uprights[0].position.x = 82;
		Uprights[0].position.z = 15;
		scene.add(Uprights[1]);
		Uprights[1].position.x = -82;
		Uprights[1].position.z = 15;

		var Trees = [];
		for (var i=0; i<15; i++){
			Trees.push(createTree());
			scene.add(Trees[i]);
			Trees[i].scale.x =7;
			Trees[i].scale.y =7;
			Trees[i].scale.z =7;
			Trees[i].position.x = -90 + 12*i;
			Trees[i].position.y = -15;
			Trees[i].position.z = -85 + (15*(i%3));
		}
	}

	function makeScoreboard(){
		var scoreboard = document.getElementById("scoreboard");
		scoreboard.innerHTML = "<h1>RUGBY ROUNDUP</h1>\n<h2>Balls remaining: "+ ballsLeft+"</h2>\n<h3>Score: "+ currentScore + "<h5>Press spacebar to pause.</h5>";
		scene.add(scoreboard);
	}

	function initCharAnim(){
		framenumber = 0;
		threadNum = 0;
		threadNum2= 0;
		updateMats();

	}
function updateMats(){
	var bools = [true, false];
	for (var i = 0; i<currentLevel.numKids; i++){
		trackPad[i]= 0;
		var random = Math.trunc(Math.random()*2);
		moving.push(true);
		xdirection.push(bools[random]);
		random = Math.trunc(Math.random()*2);
		zdirection.push(bools[random]);
		standing.push(true);
	}
}


	function addKids(){
		for(var i = 0; i < models[CHILDREN].length; i++){
		scene.remove(models[CHILDREN][i]);
		}
		models[CHILDREN] = makeChildren();
		for(var i = 0; i < currentLevel.numKids; i++){
		scene.add(models[CHILDREN][i]);
		}
		for(var i = 0; i < currentLevel.numKids; i++){
		models[CHILDREN][i].scale.x = 2;
		models[CHILDREN][i].scale.y = 2;
		models[CHILDREN][i].scale.z = 2;
		models[CHILDREN][i].position.y = -26;
		models[CHILDREN][i].position.x = Math.random()*100-50;
		models[CHILDREN][i].position.z = Math.random()*100-40;
		}
	}

	function makeChildren(){
		var kids = [];
		for(var i = 0; i < currentLevel.numKids; i++){
			playerJersey = 0;
			kids.push(createHero(childPalatte));
		}
		return kids;
	}

	function makeModels(){
		var kids = makeChildren();
		moveChildren(kids);
		return [null, kids];
	}

	function animate()
	{
		requestAnimationFrame( animate );
		render();
		update();
	}
	function update()
	{
		if(paused === false){
			//ensures balls fall each frame
			childfn ++;//framenumber for children animation.
			checkCollisions(models[HERO], Balls, models[CHILDREN]);
			moveBalls(currentLevel.rateOfFall);
			moveChildren(models[CHILDREN]);
			moveHero();
			controls.update();
		//	stats.update();
		}
	}

	function moveBalls(rateOfFall){

		for(var i=0; i<Balls.length; i++){
			Balls[i].ball.position.y -=rateOfFall;
			if( Balls[i].ball.position.y <90){
				Balls[i].shadow.scale.x = Math.abs((120-Balls[i].ball.position.y)*11);
				Balls[i].shadow.scale.z = Math.abs((120-Balls[i].ball.position.y)*11);
			}
			if(Balls[i].ball.position.y < -27){
				Balls[i].shadow.scale.x = .0001;
				Balls[i].shadow.scale.z = .0001;
			}

			if(Balls[i].ball.position.y < -32){
				Balls[i].ball.position.y = 50 + currentLevel.populationRate*Math.random()*10;
				if(Balls[i].ball.position.z !== 1000){
					randomizeBallPos(Balls[i]);
				}
			}
			else{
				drawBalls();
			}
		}
	}

	function drawBalls(){
		for (var i=0; i<Balls.length; i++){
			scene.add(Balls[i].ball);
		}
		for (var i=0; i<Balls.length; i++){
			scene.add(Balls[i].shadow);
		}
	}




	function render()
	{
		renderer.render( scene, camera );
	}

	function moveHero(){
		var xmin = -75;
		var xmax = 75;
		var zmin = -45;
		var zmax = 72;
		//change position of character in world
		var Hero = models[HERO];
		var speed = levels[0].heroSpeed;
		switch( direction ) {
			case "-x":
			if(Hero.position.x > xmin){
				Hero.position.x -= speed;
				break;
			}
			break;
			case "x":
			if(Hero.position.x  < xmax){
				Hero.position.x += speed;
				break;
			}
			break;
			case "-z":
			if(Hero.position.z > zmin){
				Hero.position.z -= speed;
				break;
			}
			break;
			case "z":
			if(Hero.position.z < zmax){
				Hero.position.z += speed;
				break;
			}
			break;
			case "stop":
			break;
		}
	}
	//keep track of if the player is moving the character or not
	var pressed = false;
	var direction = "";
	function doKey(event) {
		var code = event.code;
		if(code == "Space"){
			pause();
		}
			switch( code ) {
				case "ArrowLeft":
				direction = "-x";
				break;
				case "ArrowRight":
				direction = "x";
				break;
				case "ArrowUp":
				direction = "-z";
				break;
				case "ArrowDown":
				direction = "z";
				break;
			}
		//one-time actions: start animation and turning character
		if(pressed == false){
			pressed = true;
			//while button is being held: edit position
			if(paused==false){
				switch( code ) {
					case "ArrowLeft":
					 models[HERO].rotation.y = -Math.PI/2;
					break;
					case "ArrowRight":
					 models[HERO].rotation.y = Math.PI/2;
					break;
					case "ArrowUp":
					 models[HERO].rotation.y = Math.PI;
					break;
					case "ArrowDown":
					 models[HERO].rotation.y = 0;
					break;
				}
			}
			//initiate the running motion
			if(paused==false && (code == "ArrowLeft" || code == "ArrowRight"  || code == "ArrowUp" ||code == "ArrowDown")){
				animateHero(models[HERO], pressed);
			}
		}
	}

	function stopKey(){
		pressed = false;
		direction = "stop";
		animateHero(models[HERO],pressed);
	}
