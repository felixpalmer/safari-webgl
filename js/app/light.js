define( ["three", "scene"], function ( THREE, scene ) {
  var light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 500, 0, 300 );
  light.castShadow = true;
  scene.add( light );
  return light;
} );
