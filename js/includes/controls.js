//registreer de callback wanneer er een pointerlock event actief is
document.addEventListener('pointerlockchange', changeCallback, false);
document.addEventListener('mozpointerlockchange', changeCallback, false);
document.addEventListener('webkitpointerlockchange', changeCallback, false);

function registerPointerLock(){
    var canvas = document.getElementById('lockPointer');
    canvas.requestPointerLock = canvas.requestPointerLock ||
        canvas.mozRequestPointerLock ||
        canvas.webkitRequestPointerLock;

    //vraag het aan de browser
    canvas.requestPointerLock();
}

// aangeroepen wanneer de pointerlock is verandert
function changeCallback(e) {
    var canvas = document.getElementById('lockPointer');
    if(document.pointerLockElement === canvas ||
        document.mozPointerLockElement === canvas ||
        document.webkitPointerLockElement === canvas) {

        //start mouse listener voor x en y
        document.addEventListener("mousemove", moveCallback, false);
    }else{
        //anders remove mouse listener
        document.removeEventListener("mousemove", moveCallback, false);
    }
};

//handelt het event af op de canvas waar de muis heen gaat
function moveCallback(e) {
    var canvas = document.getElementById('lockPointer');

    //krijg de referenties van de muis
    var movementX = e.movementX ||
        e.mozMovementX ||
        e.webkitMovementX ||
        0;

    var movementY = e.movementY ||
        e.mozMovementY ||
        e.webkitMovementY ||
        0;

    console.log('x:', movementX);
    console.log('y:', movementY);
}