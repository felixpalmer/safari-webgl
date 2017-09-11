define( ["three", "scene"], function ( THREE, scene ) {
  //var light = new THREE.DirectionalLight( 0xffffff );
  var light = new THREE.SpotLight( 0xffffff, 1, 0, Math.PI / 2, 1 );
  light.position.set( 25, -20, 20 );
  light.target.position.set( 0, 0, 0 );
  light.castShadow = true;
  light.shadow.camera.near = 10;
  light.shadow.camera.far = 90;
  light.shadow.camera.fov = 65;
  light.shadow.bias = 0.001;
  light.shadow.darkness = 0.6;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  scene.add( light );
  return light;
} );
