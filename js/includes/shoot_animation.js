var bulletList = new Array();

function newShot(x, z, direction) {
	  var sphere = new THREE.Mesh(new THREE.SphereGeometry(0.8, 10, 10), new THREE.MeshLambertMaterial({ color: 0xFFFF00 }));
      sphere.overdraw = true;
	  sphere.position.x = x;
	  sphere.position.z = z;
	  sphere.position.y = 15;
	  bulletList.push([sphere, direction]);
      scene.add(sphere);
	  
}

function updateShootAnimations() {
	var bulletspeed = 10;
	for (var i=0;i<bulletList.length;i++) {
		bulletList[i][0].position.z  -= bulletspeed * Math.cos(bulletList[i][1]);	
		bulletList[i][0].position.x  -= bulletspeed * Math.sin(bulletList[i][1]);	
	}
}