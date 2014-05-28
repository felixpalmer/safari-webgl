define( ["three", "scene"], function ( THREE, scene ) {
  var cubeCamera = new THREE.CubeCamera( 1, 1000, 256 );
  cubeCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
  scene.add( cubeCamera );
  return cubeCamera;
} );
