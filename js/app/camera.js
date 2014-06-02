define( ["three", "container"], function ( THREE, container ) {
  var camera = new THREE.PerspectiveCamera( 70, 1, 1, 5000 );
  camera.position.x = -18;
  camera.position.y = 10;
  camera.position.z = 33;
  camera.up = new THREE.Vector3( 0, 0, 1 );

  var updateSize = function () {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
  };
  window.addEventListener( 'resize', updateSize, false );
  updateSize();

  return camera;
} );
