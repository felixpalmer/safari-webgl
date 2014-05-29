define( ["three", "container"], function ( THREE, container ) {
  var camera = new THREE.PerspectiveCamera( 70, 1, 1, 5000 );
  camera.position.x = 7;
  camera.position.y = -20;
  camera.position.z = 15;

  var updateSize = function () {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
  };
  window.addEventListener( 'resize', updateSize, false );
  updateSize();

  return camera;
} );
