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
      app.blob.castShadow = true;
      app.blob.receiveShadow = true;
      scene.add( app.blob );
      
      app.smallRing = new THREE.Mesh( geometry.smallRing, material.chrome );
      app.smallRing.position.x = 14.7;
      app.smallRing.castShadow = true;
      app.smallRing.receiveShadow = true;
      scene.add( app.smallRing );

      app.backplate = new THREE.Mesh( geometry.backplate, material.world );
      app.backplate.rotation.z = -Math.PI / 2;
      app.backplate.castShadow = true;
      app.backplate.receiveShadow = true;
      scene.add( app.backplate );

      app.arrowRed = new THREE.Mesh( geometry.arrow, material.arrowRed );
      app.arrowRed.rotation.z = 0.3 * Math.PI;
      app.arrowRed.position.z = 0.2;
      app.arrowRed.castShadow = true;
      scene.add( app.arrowRed );
      app.arrowWhite = new THREE.Mesh( geometry.arrow, material.arrowWhite );
      app.arrowWhite.rotation.z = 1.3 * Math.PI;
      app.arrowWhite.position.z = 0.2;
      app.arrowWhite.castShadow = true;
      scene.add( app.arrowWhite );

      app.cover = new THREE.Mesh( geometry.cover, material.cover );
      app.cover.receiveShadow = true;
      app.cover.scale = new THREE.Vector3( 1, 1, 0.1 );
      scene.add( app.cover );

      app.centerBlob = new THREE.Mesh( geometry.blob, material.arrowWhite );
      app.centerBlob.position.z = 0.28;
      app.centerBlob.scale = new THREE.Vector3( 0.6, 0.6, 0.25 );
      app.centerBlob.castShadow = true;
      scene.add( app.centerBlob );
      
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
