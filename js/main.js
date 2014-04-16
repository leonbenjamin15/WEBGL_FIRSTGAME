//keyboard listener
var keyboard = new THREEx.KeyboardState(); // dit library object gebruiken we om op elk moment te checken

//init canvas screen
var width = window.innerWidth;
var height = window.innerHeight;
var renderer;
var scene;
var camera;

init(width, height);

//geef de player een camera
addCamera(width, height);

//render floor
addCube(9000, 0, 9000, 0xFFFFFF, 0, 0, 'images/floor_texture01.png', 0x555555, 20, true, 10, 10);
/*
var cubeGeometry = new THREE.CubeGeometry(500, 10, 500);	
var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x0000FF });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);	// maak een cube
cube.position.y = -5;  
cube.rotation.y = Math.PI * 45 / 180;	// draai de cube 45 graden op de Y-as 
 
scene.add(cube);
*/

var pointLight1 = new THREE.PointLight(0xffffff);
pointLight1.position.set(0, 400, 600);	// licht hang recht boven de scene 
scene.add(pointLight1);
 
addCube(30,30,30, 0xFF0000, 0, 330, 'images/floor_texture01.png', 0x555555, 20);

var now,
    dt   = 0,
    last = timestamp(),
    step = 1/60;

requestAnimationFrame(frame);
 