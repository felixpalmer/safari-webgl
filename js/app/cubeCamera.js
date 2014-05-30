define( ["three", "geometry", "scene"], function ( THREE, geometry, scene ) {
  var cubeCamera = new THREE.CubeCamera( 50, 1000, 256 );
  //cubeCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
  cubeCamera.position.z = geometry.chromeRadius;
  scene.add( cubeCamera );
  return cubeCamera;
} );
