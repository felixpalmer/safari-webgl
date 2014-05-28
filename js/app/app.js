define( ["three", "camera", "controls", "geometry", "light", "material", "renderer", "scene"],
function ( THREE, camera, controls, geometry, light, material, renderer, scene ) {
  var app = {
    clock: new THREE.Clock( true ),
    init: function () {
      app.clock.start();
      app.sphere = new THREE.Mesh( geometry.sphere, material.grass );
      scene.add( app.sphere );
    },
    animate: function () {
      window.requestAnimationFrame( app.animate );
      controls.update();

      var time = app.clock.getElapsedTime() ;
      app.sphere.rotation.x = 5 * Math.sin( 0.5 * time );
      app.sphere.rotation.y = 0.4 * Math.sin( 5 * time );

      renderer.render( scene, camera );
    }
  };
  return app;
} );
