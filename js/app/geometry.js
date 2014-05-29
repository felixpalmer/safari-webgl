define( ["three"], function ( THREE ) {

  var arrowPoints = [
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 0, 1, 0 ),
    new THREE.Vector3( 0, 0, 10 )
  ];
  var arrow = new THREE.LatheGeometry( arrowPoints, 3 );

  // Rotate arrow and scale to correct proportions
  var m = new THREE.Matrix4();
  m.makeRotationX( Math.PI / 2 );
  arrow.applyMatrix( m );
  m.makeScale( 1, 1, 0.2 );
  arrow.applyMatrix( m );

  return {
    arrow: arrow,
    backplate: new THREE.CircleGeometry( 10.8, 32 ),
    blob: new THREE.SphereGeometry( 1, 32, 32 ),
    ring: new THREE.TorusGeometry( 11.8, 1.2, 32, 100 ),
    smallRing: new THREE.TorusGeometry( 1.3, 0.1, 16, 32 )
  };
} );
