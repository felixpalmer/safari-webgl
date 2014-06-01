define( ["three", "gentilisBold"], function ( THREE ) {
  var plateRadius = 10.8;
  var rimRadius = 0.7;
  var chromeRadius = 1.6;

  // Define cross section of ring using a path
  var ringPath = new THREE.Path();
  ringPath.moveTo( plateRadius - 0.2, 0.2 );
  ringPath.lineTo( plateRadius + rimRadius, 0 );
  //ringPath.lineTo( plateRadius - 1, 4 );
  ringPath.absarc( plateRadius + rimRadius + chromeRadius, 0,
                   chromeRadius,
                  -Math.PI / 2, Math.PI, false ); // Note center coordinates are relative to current location!
  ringPath.lineTo( plateRadius, -2 );

  // Convert cross-section into a 3D shape using the lathe geometry
  var points = ringPath.getPoints( 24, true );
  var vectors = [];
  for ( var p = points.length - 1; p >= 0; p-- ) {
  //for ( var p = 0; p < points.length; p++ ) {
    vectors.push( new THREE.Vector3( 0, points[p].x, points[p].y ) );
  }
  var ring = new THREE.LatheGeometry( vectors, 128 );
  //var ring = new THREE.TorusGeometry( plateRadius + chromeRadius / 2, chromeRadius, 32, 100 );

  var arrowPoints = [
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 0, 1.3, 0 ),
    new THREE.Vector3( 0, 0, 10 )
  ];
  var arrow = new THREE.LatheGeometry( arrowPoints, 3 );

  // Rotate arrow and scale to correct proportions
  var m = new THREE.Matrix4();
  m.makeRotationX( Math.PI / 2 );
  arrow.applyMatrix( m );
  m.makeScale( 1, 1, 0.2 );
  arrow.applyMatrix( m );

  var triangle = new THREE.CircleGeometry( 1, 3 );

  var createText = function( t ) {
    var text = new THREE.TextGeometry( t, {
      size: 2,
      height: 0.04,
      font: "gentilis",
      weight: "bold",
      style: "normal"
    } );
    m.makeRotationZ( -Math.PI / 2 );
    text.applyMatrix( m );
    // A bit of a hack, but we can't center text otherwise :(
    if ( t === "N" ) {
      m.makeTranslation( -0.8, 0.9, 0 );
    } else if ( t === "W" ) {
      m.makeTranslation( -1, 1.2, 0 );
    } else {
      m.makeTranslation( -0.8, 0.8, 0 );
    }

    text.applyMatrix( m );
    return text;
  };

  var flatRingRadius = 3.33;
  var flatRingPoints = [
    new THREE.Vector3( flatRingRadius + 0.1, 0, 0 ),
    new THREE.Vector3( flatRingRadius - 0.1, 0, 0 )
  ];
  var flatRing = new THREE.LatheGeometry( flatRingPoints, 64 );

  return {
    arrow: arrow,
    circle: new THREE.CircleGeometry( 1.4, 32 ),
    chromeRadius: chromeRadius,
    compassRadius: 2 * chromeRadius + plateRadius + rimRadius,
    cover: new THREE.SphereGeometry( plateRadius + rimRadius, 32, 16, 0, Math.PI ),
    flatRing: flatRing,
    flatRingRadius: flatRingRadius,
    backplate: new THREE.CircleGeometry( plateRadius, 32 ),
    blob: new THREE.SphereGeometry( 1, 32, 32 ),
    plateRadius: plateRadius,
    ring: ring,
    rimRadius: rimRadius,
    smallRing: new THREE.TorusGeometry( 1.3, 0.1, 16, 32 ),
    table: new THREE.PlaneGeometry( 600, 600 ),
    text: createText,
    triangle: triangle
  };
} );
