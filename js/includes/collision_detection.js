var collisionList = new Array();

function collisionObject(xpos, zpos, depth, width) {
	this.xpos = xpos;
	this.zpos = zpos;
	this.width = width;
	this.depth = depth;
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