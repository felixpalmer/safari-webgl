define( ["three", "scene"], function ( THREE, scene ) {
  var light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 500, 0, 300 );
  scene.add( light );
  return light;
} );
