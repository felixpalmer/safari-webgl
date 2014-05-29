define( ["three"], function ( THREE ) {
  var plateRadius = 10.8;
  var chromeRadius = 1.2;


  
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

  var cover = new THREE.SphereGeometry( plateRadius, 32, 16, 0, Math.PI );
  m.makeScale( 1, 1, 0.2 );
//  cover.applyMatrix( m );

  return {
    arrow: arrow,
    cover: cover,
    backplate: new THREE.CircleGeometry( plateRadius, 32 ),
    blob: new THREE.SphereGeometry( 1, 32, 32 ),
    ring: new THREE.TorusGeometry( plateRadius + chromeRadius / 2, chromeRadius, 32, 100 ),
    smallRing: new THREE.TorusGeometry( 1.3, 0.1, 16, 32 )
  };
} );
