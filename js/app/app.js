define( ["three", "camera", "controls", "cubeCamera", "geometry", "light", "material", "renderer", "scene"],
function ( THREE, camera, controls, cubeCamera, geometry, light, material, renderer, scene ) {
  var app = {
    clock: new THREE.Clock( true ),
    init: function () {
      app.sky = new THREE.Mesh( new THREE.SphereGeometry( 500, 60, 40 ), material.sky );
      app.sky.scale.x = -1;
      scene.add( app.sky );

      app.clock.start();
      app.ring = new THREE.Mesh( geometry.ring, material.chrome );
      scene.add( app.ring );
    },
    animate: function () {
      window.requestAnimationFrame( app.animate );
      controls.update();

      //var time = app.clock.getElapsedTime() ;

      app.sky.visible = true;
      cubeCamera.updateCubeMap( renderer, scene );
      app.sky.visible = false;

      renderer.render( scene, camera );
    }
  };
  return app;
} );
