define( ["three"], function ( THREE ) {
  var camera = new THREE.PerspectiveCamera( 70, 1, 0.1, 500 );
  camera.position.x = -18;
  camera.position.y = 10;
  camera.position.z = 33;
  camera.up = new THREE.Vector3( 0, 0, 1 );
  
  // Define location to rotate camera around
  camera.orbitObject = null;

  return camera;
} );
