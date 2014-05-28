define( ["three", "camera", "controls", "cubeCamera", "geometry", "light", "material", "renderer", "scene"],
function ( THREE, camera, controls, cubeCamera, geometry, light, material, renderer, scene ) {
  var app = {
    clock: new THREE.Clock( true ),
    init: function () {
      var sky = new THREE.Mesh( new THREE.SphereGeometry( 500, 60, 40 ), material.grass );
      sky.scale.x = -1;
      scene.add( sky );

      app.clock.start();
      app.sphere = new THREE.Mesh( geometry.sphere, material.chrome );
      scene.add( app.sphere );
    },
    animate: function () {
      window.requestAnimationFrame( app.animate );
      controls.update();

      var time = app.clock.getElapsedTime() ;
      app.sphere.rotation.x = 5 * Math.sin( 0.5 * time );
      app.sphere.rotation.y = 0.4 * Math.sin( 5 * time );

      cubeCamera.updateCubeMap( renderer, scene );
      renderer.render( scene, camera );
    }
  };
  return app;
} );
