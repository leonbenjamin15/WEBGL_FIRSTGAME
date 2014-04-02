var keyboard = new THREEx.KeyboardState(); // dit library object gebruiken we om op elk moment te checken

// get screen width and height
var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true }); // de renderer tekent dingen voor ons
renderer.setSize(width, height);  // teken op het hele scherm
// Zet de achtergrondkleur op wit, met doorzichtigheid 1 (dus niet doorzichtig)
renderer.setClearColorHex(0xFFFFFF, 1);
document.body.appendChild(renderer.domElement);  // renderer add zichzelf in de webpage, geen <canvas> tag nodig dus
 
var scene = new THREE.Scene;

var cubeGeometry = new THREE.CubeGeometry(500, 10, 500);	
var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x0000FF });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);	// maak een cube
cube.position.y = -5;  
cube.rotation.y = Math.PI * 45 / 180;	// draai de cube 45 graden op de Y-as 
 
scene.add(cube);

var pointLight1 = new THREE.PointLight(0xffffff);
pointLight1.position.set(0, 400, 600);	// licht hang recht boven de scene 
scene.add(pointLight1);

// dit wordt onze camera
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000); //45 graden lens, ziet niet dichterbij dan 0.1 en niet verderweg dan 10000

// zet de camera positie naar boven (y) en iets naar achter (z) zodat we de cube (die in het midden staat) kunnen zien
camera.position.y = 20;
camera.position.z = 500;
camera.rotation.order = 'YXZ'

scene.add(camera); 
 
addCube(30,30,30, 0xFF0000, 0, 330);

var now,
    dt   = 0,
    last = timestamp(),
    step = 1/60;

function frame() {
  now = timestamp();
  dt = dt + Math.min(1, (now - last) / 1000);
  while(dt > step) {
    dt = dt - step;
    update();
  }
  renderer.render(scene, camera);
  last = now;
  requestAnimationFrame(frame);
}
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
	var cubeMaterial = new THREE.MeshLambertMaterial({ color: clr });
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
 