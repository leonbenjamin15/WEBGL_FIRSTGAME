// get screen width and height
var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true }); // de renderer tekent dingen voor ons
renderer.setSize(width, height);  // teken op het hele scherm
// Zet de achtergrondkleur op wit, met doorzichtigheid 1 (dus niet doorzichtig)
renderer.setClearColorHex(0xFFFFFF, 1);
document.body.appendChild(renderer.domElement);  // renderer add zichzelf in de webpage, geen <canvas> tag nodig dus
 
var scene = new THREE.Scene;

var cubeGeometry = new THREE.CubeGeometry(1000, 10, 1000);	
var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x0000FF })
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);	// maak een cube
  
cube.rotation.y = Math.PI * 45 / 180;	// draai de cube 45 graden op de Y-as 
 
scene.add(cube);

var pointLight1 = new THREE.PointLight(0xffffff);
pointLight1.position.set(0, 400, 0);	// licht hang recht boven de scene 
scene.add(pointLight1);

// dit wordt onze camera
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000); //45 graden lens, ziet niet dichterbij dan 0.1 en niet verderweg dan 10000

// zet de camera positie naar boven (y) en iets naar achter (z) zodat we de cube (die in het midden staat) kunnen zien
camera.position.y = 40;
camera.position.z = 400;

scene.add(camera); 
 
renderer.render(scene, camera); // teken deze scene op het scherm
