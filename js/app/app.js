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

      // Table to place compass on
      app.table = new THREE.Mesh( geometry.table, material.wood );
      app.table.receiveShadow = true;
      app.table.position.z = -geometry.chromeRadius;
      scene.add( app.table );

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

      app.arrowRed = new THREE.Mesh( geometry.arrow, material.flatRed );
      app.arrowRed.rotation.z = 0.3 * Math.PI;
      app.arrowRed.position.z = 0.2;
      app.arrowRed.castShadow = true;
      scene.add( app.arrowRed );
      app.arrowWhite = new THREE.Mesh( geometry.arrow, material.flatWhite );
      app.arrowWhite.rotation.z = 1.3 * Math.PI;
      app.arrowWhite.position.z = 0.2;
      app.arrowWhite.castShadow = true;
      scene.add( app.arrowWhite );

      app.cover = new THREE.Mesh( geometry.cover, material.cover );
      app.cover.scale = new THREE.Vector3( 1, 1, 0.1 );
      scene.add( app.cover );

      app.centerBlob = new THREE.Mesh( geometry.blob, material.flatWhite );
      app.centerBlob.position.z = 0.28;
      app.centerBlob.scale = new THREE.Vector3( 0.6, 0.6, 0.25 );
      app.centerBlob.castShadow = true;
      scene.add( app.centerBlob );
      
      var radius = geometry.plateRadius - 0.6;
      var theta, triangle, scale;
      for ( var n = 0; n < 72; n++ ) {
        theta = n * Math.PI / 36;
        if ( n % 18 === 0 ) {
          // Large north south etc triangles
          scale = 1.3;
          triangle = new THREE.Mesh( geometry.triangle, material.flatWhite );
        } else {
          // All other triangles
          scale = n % 2 ? 0.5 : 0.8;
          triangle = new THREE.Mesh( geometry.triangle, material.flatGrey );
        }
        triangle.position.x = -radius * Math.cos( theta );
        triangle.position.y = -radius * Math.sin( theta );
        triangle.rotation.z = theta;
        triangle.position.z = 0.001;
        triangle.scale = new THREE.Vector3( scale, 0.33 * scale, scale );
        triangle.receiveShadow = true;
        scene.add( triangle );
      }
      
      // 4 labels for cardinal directions
      var directions = ["N", "W", "S", "E"];
      radius = geometry.plateRadius - 2.9;
      for ( var d = 0; d < 4; d++ ) {
        var circle = new THREE.Mesh( geometry.circle, material.flatBlue );
        var text = new THREE.Mesh( geometry.text( directions[d] ), material.flatWhite );

        theta = d * Math.PI / 2;
        text.position.x = circle.position.x = radius * Math.cos( theta );
        text.position.y = circle.position.y = radius * Math.sin( theta );
        if ( d % 2 === 1 ) {
          // Only rotate east and west
          text.rotation.z = theta;
        }
        circle.position.z = 0.0009;
        text.position.z = 0.002;
        scene.add( circle );
        scene.add( text );
      }

      // Inner white ring
      var flatRing = new THREE.Mesh( geometry.flatRing, material.flatWhite );
      flatRing.position.z = 0.0009;
      flatRing.receiveShadow = true;
      scene.add( flatRing );

      // Triangles pointing out from inner ring
      for ( n = 0; n < 8; n++ ) {
        theta = n * Math.PI / 4;
        scale = n % 2 ? 1.6 : 2.4;
        radius = geometry.flatRingRadius + scale / 2 - 0.1;
        triangle = new THREE.Mesh( geometry.triangle, material.flatWhite );
        triangle.position.x = radius * Math.cos( theta );
        triangle.position.y = radius * Math.sin( theta );
        triangle.rotation.z = theta;
        triangle.position.z = 0.002;
        triangle.scale = new THREE.Vector3( scale, 0.33 * scale, scale );
        triangle.receiveShadow = true;
        scene.add( triangle );
      }

      // Small labels, NE, SE etc
      directions = ["NW", "SW", "SE", "NE"];
      radius = 8.6;
      for ( d = 0; d < 4; d++ ) {
        var smallText = new THREE.Mesh( geometry.text( directions[d] ), material.flatWhite );

        theta = d * Math.PI / 2 + Math.PI / 4;
        smallText.position.x = radius * Math.cos( theta );
        smallText.position.y = radius * Math.sin( theta );
        smallText.position.z = 0.002;
        smallText.scale = new THREE.Vector3( 0.4, 0.4, 1 );
        smallText.rotation.z = theta;
        scene.add( smallText );
      }
    },
    animate: function () {
      window.requestAnimationFrame( app.animate );
      controls.update();

      //var time = app.clock.getElapsedTime() ;

      // Hide elements that we don't want in the reflection map
      app.ring.visible = false;
      app.table.visible = false;
      app.sky.visible = true;
      cubeCamera.updateCubeMap( renderer, scene );
      app.ring.visible = true;
      app.table.visible = true;
      app.sky.visible = false;

      renderer.render( scene, camera );
    }
  };
  return app;
} );
