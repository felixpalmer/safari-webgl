define( ["three", "camera", "controls", "cubeCamera", "geometry", "light", "material", "renderer", "scene"],
function ( THREE, camera, controls, cubeCamera, geometry, light, material, renderer, scene ) {
  var app = {
    clock: new THREE.Clock( true ),
    init: function () {
      app.clock.start();

      // Create skybox
      app.sky = new THREE.Mesh( new THREE.SphereGeometry( 500, 60, 40 ), material.sky );
      app.sky.scale.x = -1;
      scene.add( app.sky );

      // Put together compass
      // TODO refactor into component
      app.ring = new THREE.Mesh( geometry.ring, material.chrome );
      app.ring.castShadow = true;
      app.ring.receiveShadow = true;
      scene.add( app.ring );

      app.blob = new THREE.Mesh( geometry.blob, material.chrome );
      app.blob.position.x = 13;
      scene.add( app.blob );
      
      app.smallRing = new THREE.Mesh( geometry.smallRing, material.chrome );
      app.smallRing.position.x = 14.7;
      scene.add( app.smallRing );

      app.backplate = new THREE.Mesh( geometry.backplate, material.world );
      app.backplate.rotation.z = -Math.PI / 2;
      scene.add( app.backplate );
    },
    animate: function () {
      window.requestAnimationFrame( app.animate );
      controls.update();

      //var time = app.clock.getElapsedTime() ;

      app.ring.visible = false;
      app.sky.visible = true;
      cubeCamera.updateCubeMap( renderer, scene );
      app.sky.visible = false;
      app.ring.visible = true;

      renderer.render( scene, camera );
    }
  };
  return app;
} );
