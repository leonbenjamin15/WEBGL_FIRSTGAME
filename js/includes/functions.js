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
 * maakt een cube
 * @param x
 * @param y
 * @param z
 * @param clr
 * @param xp
 * @param zp
 */
function addCube(x, y, z, clr, xp, zp, img, spec, sh, repeat, s_set, t_set) {
    var texture = THREE.ImageUtils.loadTexture(img, {}, function(){
        renderer.render(scene, camera);
    });

    if(repeat == true){
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(s_set, t_set);
    }

    var cubeGeometry = new THREE.CubeGeometry(x, y, z);
    var cubeMaterial = new THREE.MeshBasicMaterial({color: clr, map: texture, specular: spec, shininess: sh});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);	// maak een cube

    cube.position.x = xp;
    cube.position.y = y/2;
    cube.position.z = zp;
    cube.rotation.y = Math.PI * 15 / 180;
    scene.add(cube);
}

/**
 *
 * @returns {number}
 */
function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}