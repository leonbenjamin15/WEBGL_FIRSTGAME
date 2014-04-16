//keyboard listener
var keyboard = new THREEx.KeyboardState(); // dit library object gebruiken we om op elk moment te checken

//init canvas screen
var width = window.innerWidth;
var height = window.innerHeight;
var renderer;
var scene;
var camera;

var renderer = new THREE.WebGLRenderer({ antialias: true }); // de renderer tekent dingen voor ons
renderer.setSize(width, height);  // teken op het hele scherm
// Zet de achtergrondkleur op wit, met doorzichtigheid 1 (dus niet doorzichtig)
renderer.setClearColor(0xFFFFFF, 1);
document.body.appendChild(renderer.domElement);  // renderer add zichzelf in de webpage, geen <canvas> tag nodig dus
 
var scene = new THREE.Scene;

var texture = THREE.ImageUtils.loadTexture( 'images/floor_texture01.png' );

=======
init(width, height);

//geef de player een camera
addCamera(width, height);

//render floor
addCube(9000, 0, 9000, 0xFFFFFF, 0, 0, 'images/floor_texture01.png', 0x555555, 20, true, 10, 10);

var pointLight1 = new THREE.PointLight(0xffffff);
pointLight1.position.set(0, 400, 600);	// licht hang recht boven de scene 
scene.add(pointLight1);
 
addCube(30,30,30, 0xFF0000, 0, 330, 'images/floor_texture01.png', 0x555555, 20);

var now,
    dt   = 0,
    last = timestamp(),
    step = 1/60;

requestAnimationFrame(frame);

function update() {
	processInput();
}

function processInput() {
	if(keyboard.pressed("up")) {
		camera.position.z -= Math.cos(camera.rotation.y);
		camera.position.x -= Math.sin(camera.rotation.y);
	}
	if(keyboard.pressed("down")) {
		camera.position.z += Math.cos(camera.rotation.y);
		camera.position.x += Math.sin(camera.rotation.y);
	}
	if(keyboard.pressed("left")) camera.rotation.y+= Math.PI * 1 / 180;
	if(keyboard.pressed("right")) camera.rotation.y-= Math.PI * 1 / 180;
 }
 
function addCube(x, y, z, clr, xp, zp) {
	var cubeGeometry = new THREE.CubeGeometry(x, y, z);	
	var cubeMaterial = new THREE.MeshLambertMaterial({ map:texture, side:THREE.DoubleSide });
	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);	// maak een cube
	cube.position.x = xp;
	cube.position.y = y/2;
	cube.position.z = zp;
	cube.rotation.y = Math.PI * 15 / 180;
	scene.add(cube);
}
 
 function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}