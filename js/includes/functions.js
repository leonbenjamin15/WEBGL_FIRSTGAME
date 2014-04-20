/**
 * load canvas screen
 */
function init(width, height){
    renderer = new THREE.WebGLRenderer({ antialias: true }); // de renderer tekent dingen voor ons
    renderer.setSize(width, height);  // teken op het hele scherm
    // Zet de achtergrondkleur op wit, met doorzichtigheid 1 (dus niet doorzichtig)
    renderer.setClearColorHex(0xFFFFFF, 1);
    document.body.appendChild(renderer.domElement);  // renderer add zichzelf in de webpage, geen <canvas> tag nodig dus

    scene = new THREE.Scene;
}

function addCamera(width, height){
    // dit wordt onze camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000); //45 graden lens, ziet niet dichterbij dan 0.1 en niet verderweg dan 10000

    // zet de camera positie naar boven (y) en iets naar achter (z) zodat we de cube (die in het midden staat) kunnen zien
    camera.position.y = 20;
    camera.position.z = 500;
    camera.rotation.order = 'YXZ'

    scene.add(camera);
}

/**
 * wordt gebruikt bij elke druk de keyboard
 */
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

/**
 * load keyboard listener
 */
function update() {
    processInput();
	detectCollision(0, -200, 10, 200);
	logPosition();
}

function logPosition() {
	console.log("x" + camera.position.x);
	console.log("z" + camera.position.z);
}
/**
 * render frame voor de player
 */
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

/**
 * add cube in de map
 * @param x
 * @param y
 * @param z
 * @param img
 * @param rx
 * @param ry
 * @param xp
 * @param yp
 * @param zp
 */
function addCube(x, y, z, img, rx, ry, xp, yp, zp) {
    var texture = THREE.ImageUtils.loadTexture(img);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = 100 / rx;
    texture.repeat.y = 100 / ry;
    texture.needsUpdate = true;

    var cubeGeometry = new THREE.CubeGeometry(x, y, z);
    var cubeMaterial = new THREE.MeshLambertMaterial({ map: texture, side:THREE.FrontSide });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);	// maak een cube
    cube.position.x = xp;
    cube.position.y = y/2+yp;
    cube.position.z = zp;
    cube.rotation.y = Math.PI * 0 / 180;
    scene.add(cube);
}

function detectCollision(xpos, zpos, depth, width) {
	var playerSize = 5;
	var x1 = xpos+width/2+playerSize;
	var x2 = xpos-width/2-playerSize;
	var z1 = zpos+depth/2+playerSize;
	var z2 = zpos-depth/2-playerSize;
	
	
	if( camera.position.x < x1 && camera.position.x > x2 && camera.position.z < z1 && camera.position.z > z2) {
		var d1 = Math.abs((x1 - camera.position.x));
		var d2 = Math.abs((camera.position.x - x2));
		var d3 = Math.abs((z1 - camera.position.z));
		var d4 = Math.abs((camera.position.z - z2));
		var max = Math.min(d1, d2, d3, d4);
		
			switch(max) 
			{
				case d1:
					camera.position.x = x1;
					break;
				case d2:
					camera.position.x = x2;
					break;					
				case d3:
					camera.position.z = z1;
					break;					
				case d4:
					camera.position.z = z2;
					break;
			}
		}
}
/**
 *
 * @returns {number}
 */
function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}