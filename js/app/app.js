define( ["three", "camera", "container", "controls", "geometry", "light", "material", "renderer", "scene"],
function ( THREE, camera, container, controls, geometry, light, material, renderer, scene ) {
  var app = {
    bearing: 0.3 * Math.PI,
    clock: new THREE.Clock( true ),
    mouse: { x: 100, y: 200 },
    init: function () {
      app.clock.start();

      // Table to place compass on
      app.table = new THREE.Mesh( geometry.table, material.wood );
      app.table.receiveShadow = true;
      app.table.position.x = 20;
      app.table.position.y = -10;
      app.table.position.z = -geometry.chromeRadius;
      scene.add( app.table );

      // Put together compass
      app.ring = new THREE.Mesh( geometry.ring, material.chrome );
      app.ring.castShadow = true;
      app.ring.receiveShadow = true;
      scene.add( app.ring );

      app.blob = new THREE.Mesh( geometry.blob, material.chrome );
      app.blob.position.x = geometry.compassRadius;
      app.blob.castShadow = true;
      app.blob.receiveShadow = true;
      scene.add( app.blob );
      
      app.smallRing = new THREE.Mesh( geometry.smallRing, material.chrome );
      app.smallRing.position.x = geometry.compassRadius + 1.2;
      app.smallRing.castShadow = true;
      app.smallRing.receiveShadow = true;
      scene.add( app.smallRing );

      app.backplate = new THREE.Mesh( geometry.backplate, material.world );
      app.backplate.rotation.z = -Math.PI / 2;
      app.backplate.castShadow = true;
      app.backplate.receiveShadow = true;
      scene.add( app.backplate );

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
          scale = n % 2 ? 0.4 : 0.8;
          triangle = new THREE.Mesh( geometry.triangle, material.flatGrey );
        }
        triangle.position.x = -( radius + scale / 2) * Math.cos( theta );
        triangle.position.y = -( radius + scale / 2) * Math.sin( theta );
        triangle.rotation.z = theta;
        triangle.position.z = 0.01;
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
        circle.position.z = 0.005;
        text.position.z = 0.01;
        circle.receiveShadow = true;
        text.receiveShadow = true;
        if ( directions[d] === "E" ) {
          app.label = text;
        }
        scene.add( circle );
        scene.add( text );
      }

      // Inner white ring
      app.flatRing = new THREE.Mesh( geometry.flatRing, material.flatWhite );
      app.flatRing.position.z = 0.01;
      app.flatRing.receiveShadow = true;
      scene.add( app.flatRing );

      // Needle
      app.arrowRed = new THREE.Mesh( geometry.arrow, material.flatRed );
      app.arrowRed.rotation.z = app.bearing;
      app.arrowRed.position.z = 0.2;
      app.arrowRed.castShadow = true;
      scene.add( app.arrowRed );
      app.arrowWhite = new THREE.Mesh( geometry.arrow, material.flatWhite );
      app.arrowWhite.rotation.z = app.bearing + Math.PI;
      app.arrowWhite.position.z = 0.2;
      app.arrowWhite.castShadow = true;
      scene.add( app.arrowWhite );

      app.centerBlob = new THREE.Mesh( geometry.blob, material.flatWhite );
      app.centerBlob.position.z = 0.33;
      app.centerBlob.scale = new THREE.Vector3( 0.7, 0.7, 0.35 );
      app.centerBlob.castShadow = true;
      scene.add( app.centerBlob );
      
      app.cover = new THREE.Mesh( geometry.cover, material.cover );
      app.cover.scale = new THREE.Vector3( 1, 1, 0.1 );
      scene.add( app.cover );
      
      // Get all meshes
      app.meshes = [];
      for ( var c in scene.children ) {
        if ( scene.children.hasOwnProperty( c ) ) {
          var obj = scene.children[c];
          if ( obj instanceof THREE.Mesh ) {
            app.meshes.push( obj );
          }
        }
      }
      
      // Triangles pointing out from inner ring
      for ( n = 0; n < 8; n++ ) {
        theta = n * Math.PI / 4;
        scale = n % 2 ? 1.6 : 2.4;
        radius = geometry.flatRingRadius + scale / 2 - 0.1;
        triangle = new THREE.Mesh( geometry.triangle, material.flatWhite );
        triangle.position.x = radius * Math.cos( theta );
        triangle.position.y = radius * Math.sin( theta );
        triangle.rotation.z = theta;
        triangle.position.z = 0.015;
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
      app.creditText = new THREE.Mesh( geometry.text( "@pheeelicks" ), material.flatGrey );
      app.creditText.position.y = -3.7;
      app.creditText.position.z = 0.1;
      app.creditText.scale = new THREE.Vector3( 0.1, 0.1, 0.1 );
      scene.add( app.creditText );

      container.onclick = function () {
        app.bearing = 2 * Math.PI * Math.random();
      };
      container.addEventListener( 'mousemove', function( e ) {
        app.mouse = {
          x: e.clientX - container.offsetWidth / 2,
          y: e.clientY - container.offsetHeight / 2
        };
      } );
    },
    // Enable showing wireframe version of model
    setMaterial: function( mat, objects ) {
      var iterObjects = objects ? objects : app.meshes;
      for ( var m in iterObjects ) {
        if ( iterObjects.hasOwnProperty( m ) ) {
          var mesh = iterObjects[m];
          if ( mat ) {
            if ( mesh._material === undefined ) {
              // Stash away properties we will modify
              mesh._material = mesh.material;
            }
            mesh.material = mat;
          } else { // disable
            if ( mesh._material ) {
              mesh.material = mesh._material;
            }
          }
        }
      }
    },
    wireframe: function( enable ) {
      app.setMaterial( enable ? material.wire : null );
    },
    // Highlight a single object
    highlight: function( object, dist ) {
      camera.orbitObject = object;
      camera.orbitDist = dist;
      if ( object ) {
        app.wireframe( true );
        object.material = object._material;
      } else {
        app.wireframe( false );
      }
    },
    explode: function ( explode ) {
      var dz = 0;
      for ( var m in app.meshes ) {
        if ( app.meshes.hasOwnProperty( m ) ) {
          var mesh = app.meshes[m];
          if ( explode ) {
            if ( mesh.position._z === undefined ) {
              mesh.position._z = mesh.position.z;
              mesh.rotation._x = mesh.rotation.x;
            }
            dz += 0.1;
            mesh.position.z += dz;
            mesh.rotation.x += 0.02 * dz;
          } else {
            if ( mesh.position._z !== undefined ) {
              mesh.position.z = mesh.position._z;
              mesh.rotation.x = mesh.rotation._x;
            }
          }
          mesh.updateMatrix();
        }
      }
    },
    animate: function () {
      window.requestAnimationFrame( app.animate );
      app.draw();
    },
    spin: false,
    draw: function () {
      //controls.update();

      // Calculate where camera should move to and smoothly pan
      var camPosition = new THREE.Vector3(
        - 0.1 * app.mouse.y,
        - 0.1 * app.mouse.x,
        10 + 0.07 * Math.abs( app.mouse.y )
      );
      if ( app.spin ) {
        var t = 0.55 * app.clock.getElapsedTime();
        var r = 15.0 + 12.0 * Math.cos( 0.3 * t );
        if ( camera.orbitDist ) {
          r = camera.orbitDist;
        } else if ( camera.orbitObject ) {
          r = 1.5 * camera.orbitObject.geometry.boundingSphere.radius;
        }
        camPosition = new THREE.Vector3(
            r * Math.sin( t ),
            r * Math.cos( t ),
            camera.orbitObject ? 0.4 * r : ( 12.0 + 5.0 * Math.cos( 1.3 * t ) )
            );
        if ( camera.orbitObject ) {
          camPosition.add( camera.orbitObject.position );
        }
      }
      camera.position.x += ( camPosition.x - camera.position.x ) * 0.05;
      camera.position.y += ( camPosition.y - camera.position.y ) * 0.05;
      camera.position.z += ( camPosition.z  - camera.position.z ) * 0.05;
      if ( camera.orbitObject ) {
        camera.lookAt( camera.orbitObject.position );
      } else {
        camera.lookAt( scene.position );
      }

      var time = 0.7 * app.clock.getElapsedTime() ;
      light.position.y = 3 * Math.sin ( 0.71 * time );
      light.position.x = 1 * Math.cos ( 1.21 * time );
      light.position.x = 30 - 3 * Math.cos ( 1.21 * time );

      var delta = app.arrowRed.rotation.z - app.bearing;
      app.arrowRed.rotation.z -= 0.03 * delta;
      app.arrowWhite.rotation.z -= 0.03 * delta;

      renderer.render( scene, camera );
    }
  };
  return app;
} );
