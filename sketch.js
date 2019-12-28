// variable to hold a reference to our A-Frame world
var world;
var containercrom;
let croms = ['pink_mtl', 'purple_mtl', 'orange_mtl', 'yellow_mtl', 'green_mtl', 'red_mtl']
let rx;
let ry;
let rz;
let xs = [];
let ys = [];
let col;
let rand;
let holdcroms = [];
let soundtrigger = -1;
let notcool;
let cromulon
let userpos;
let domecrom;
let gcrom;
let planecrom;
let song;
let timer = 0;
let cromU;
let muse = []
let rms;
let s;
let level
let melody
let speed = -10;
let melodies = [];
let melodycontainer
let points = 0;
let clicked =0;
let activeWorld = 0
let textHoldercrom;
let portal;
let slogo

function preload(){
	notcool = loadSound('notcool.mp3');
	song = loadSound('song.mp3');
}

function setup() {
	amplitude = new p5.Amplitude();
	//analyzer = new p5.Amplitude();

	//analyzer.setInput(song);


	// no canvas needed
	noCanvas();
	
	// construct the A-Frame world
	// this function requires a reference to the ID of the 'a-scene' tag in our HTML document
	world = new World('VRScene');

	//document.getElementById("skyview").src = "images/stars.jpg";
	containercrom = new Container3D();

	textHoldercrom = new Plane({
		x:0, y:4, z:-8,
		width: 5,
		height: 1
	});
	world.add(textHoldercrom)

	for (let i = 0; i<10; i++){
			//rand = random(0, 3)
			
			rx = random(-5, 5);
			xs.push(rx)
			ry = random(-3, 3);
			rz = random(-3, 3);
			cromulon = new Dodecahedron({
						x:rx, y: ry, z: rz,
						red: 255, green:255, blue:255,
						scaleX:0.1,
						scaleY:0.4,
						scaleZ:0.4,
						asset: random(croms),
						rotationY: 90,
						//cromulon.x += speed;
						clickFunction: function(theDodecahedron) {
								//soundtrigger *= -1;
								if (!notcool.isPlaying()){
									notcool.play();
								}
							}
						}
						);	




							
	


		

		holdcroms.push(cromulon);
		containercrom.addChild(cromulon);


	}

	world.add(containercrom);




		gcrom = new Plane({
						x:0, y:0, z:-7,
						width:10, height:10,
						red: 255, green:255, blue:255,
						
						rotationX:-90, metalness:0.25
						
					   });



	world.add(gcrom);


	domecrom = new Sphere({
						x:0, y:0, z:-7,
						radius: 6,
						red: 0, green:100, blue:150,
						opacity: 0.2,
						rotationX:-90, metalness:0.25
						
					   });



	world.add(domecrom);


planecrom = new Plane({
		x:0, y:0, z:0, 
		width: 5, height: 100, 
		red:255, green:255, blue:255, 
		rotationX:-90, 
		
	});
world.add(planecrom)

planeplay = new Box({
		x:0, y:3, z:-10, 
		width: 1, height: 1, 
		red:255, green:255, blue:255, 
		clickFunction: function(theBox) {
								//soundtrigger *= -1;
								if (!song.isPlaying()){
									song.play();
								}
								clicked = 1;

								
							}
		
	});
world.add(planeplay)





portal = new OBJ({
		asset: 'portal_obj',
		mtl: 'portal_mtl',
		
		rotationX:180,
		rotationY:180,
		scaleX:1,
		scaleY:1,
		scaleZ:1,
		z: 2
	});







	world.add(portal);

}









	
	


	




function draw() {
	userpos = world.getUserPosition();
	console.log("x: " +userpos.x)
	console.log("y: " +userpos.y)
	console.log("z: " +userpos.z)
	if (activeWorld == 0){

		sky = document.querySelector('a-sky');
		sky.setAttribute('src', '#start')
		containercrom.hide()
		textHoldercrom.hide();
		planeplay.hide()
		domecrom.hide();
		gcrom.hide()
		planecrom.hide()

		

		// if (userpos.x>0 ){
		// 	activeWorld = 1;
		// 	console.log("triggered")
		// 	//world.setUserPosition(0, 0, 10)
		// }


		if (mouseIsPressed) {
		world.moveUserForward(0.05);
	}

	if (userpos.z < 3){
		activeWorld = 1
	}


	}




	if (activeWorld == 1){

		
		
		portal.hide()
	
		sky = document.querySelector('a-sky');
		sky.setAttribute('src', '#skyview')
	if (userpos.x > -4 && userpos.x < 4 && userpos.y == 1 && userpos.z > -10 && userpos.z < -2){
		domecrom.hide();
		gcrom.hide();
		containercrom.hide()
		planecrom.show()

		

		//world.constrainPosition(-1, 1, 1, 1, -3, -2) 
		if (userpos.x < -1){
			world.setUserPosition(-1, 1, -3)
		}
		if (userpos.x > 1){
			world.setUserPosition(1, 1, -3)
		}

		
		planeplay.show()
		if (song.isPlaying()){
			planeplay.hide()
		}


	//speed+=1;
	//console.log(soundtrigger)
melodycontainer = new Container3D({x:1, y:0, z:0});

let  level = amplitude.getLevel();

if (level> 0.08) {
	
  	let pos = map(level, 0.08, 0.20, -2, 2.5);
	console.log("song: " + level)
	
	melody = new Plane({
		x:pos, y:random(1, 2), z: -10, 
		width: .1, height: .1, 
		red:255, green:random(255), blue:255, 
		clickFunction: function(thePlane) {
			points += 1;
			thePlane.setGreen(255)
			thePlane.setRed(0)
			thePlane.setBlue(0)
	}
		
	});

	melodycontainer.addChild(melody)
	timer = millis();
	melodies.push(melody)
	
	//melody.setZ(melody + 0.01);
}
world.add(melodycontainer)
for (let m=0; m<melodies.length; m++){
	
	melodies[m].setZ(melodies[m].getZ() + 0.01)

}

if (!(song.isPlaying)){
	world.remove(melodycontainer);
}
textHoldercrom.show()
console.log("POINTS" + points);
textHoldercrom.tag.setAttribute('text',
	    'value: '+points+'; color: rgb(0,0,0); align: center;');
if (!song.isPlaying() && clicked == 1 && points >= 20){
	textHoldercrom.tag.setAttribute('text',
	    'value: WIN!; color: rgb(0,0,0); align: center;');

}
if (!song.isPlaying() && clicked == 1 && points < 20){
	textHoldercrom.tag.setAttribute('text',
	    'value: LOSE!; color: rgb(0,0,0); align: center;')
}

	}
	else{
	
	sky = document.querySelector('a-sky');
		sky.setAttribute('src', '#sky')
		planecrom.hide()
		if (mouseIsPressed) {
		world.moveUserForward(0.05);
	}
	planeplay.hide()

	for (let j=0; j<holdcroms.length; j++){
		holdcroms[0].getPosX = j;;
	}
	domecrom.show();
		gcrom.show();
		containercrom.show()
		planecrom.hide()
		slogo = document.querySelector('a-image');
		slogo.setAttribute('position', '-1 5 -3')
	
	
	}

	
}

	
}





