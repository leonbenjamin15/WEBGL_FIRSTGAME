//keyboard listener
var keyboard = new THREEx.KeyboardState(); // dit library object gebruiken we om op elk moment te checken

//default globals
var width = window.innerWidth;
var height = window.innerHeight;
var renderer, scene, camera;

//init canvas screen
init(width, height);

//geef de player een camera
addCamera(width, height);
camera.position.z = 0;
camera.position.x = 0;

// twee lichten van twee kanten zodat alle zijdes belicht zijn
var pointLight1 = new THREE.PointLight(0xffffff);
pointLight1.position.set(0, 400, 600);	// licht hang recht boven en voor de scene 
scene.add(pointLight1);
var pointLight2 = new THREE.PointLight(0xffffff);
pointLight2.position.set(0, 400, -600);	// licht hang recht boven en achter de scene 
scene.add(pointLight2);

addCube(200, 25, 10, 'images/wall01.png', 7, 50, 0, 0, -200);

//render floor
addCube(500, 10, 500, 'images/floor_texture01.png', 2, 2, 0, -10, 0); // zet de vloer -10 naar beneden zodat alles op de vloer op 0 staat

var now,
    dt   = 0,
    last = timestamp(),
    step = 1/60;

requestAnimationFrame(frame);