define( ["three", "scene"], function ( THREE, scene ) {
  //var light = new THREE.DirectionalLight( 0xffffff );
  var light = new THREE.SpotLight( 0xffffff, 1, 0, Math.PI / 2, 1 );
  light.position.set( 50, 0, 40 );
  light.target.position.set( 0, 0, 0 );
  light.castShadow = true;
  light.shadowCameraNear = 40;
  light.shadowCameraFar = 80;
  light.shadowCameraFov = 30;
  light.shadowBias = 0.001;
  light.shadowDarkness = 0.6;
  light.shadowMapWidth = 2048;
  light.shadowMapHeight = 1024;
  scene.add( light );
  return light;
} );
