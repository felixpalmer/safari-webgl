define( ["three", "text!gentilisBold"], function ( THREE, gentilisBold ) {
  var plateRadius = 10.8;
  var rimRadius = 0.7;
  var chromeRadius = 1.6;

  // Define cross section of ring using a path
  var ringPath = new THREE.Path();
  ringPath.moveTo( plateRadius - 0.2, 0.2 );
  ringPath.lineTo( plateRadius + rimRadius, 0.1 );
  //ringPath.lineTo( plateRadius - 1, 4 );
  ringPath.absarc( plateRadius + rimRadius + chromeRadius, 0,
                   chromeRadius,
                  -Math.PI / 2, Math.PI, false ); // Note center coordinates are relative to current location!
  ringPath.lineTo( plateRadius, -2 );

  // Convert cross-section into a 3D shape using the lathe geometry
  var points = ringPath.getPoints( 24, true );
  points.reverse();
  var ring = new THREE.LatheGeometry( points, 128 );
  //var ring = new THREE.TorusGeometry( plateRadius + chromeRadius / 2, chromeRadius, 32, 100 );
  var m = new THREE.Matrix4();
  m.makeRotationX( Math.PI / 2 );
  ring.applyMatrix( m );

  var arrowPoints = [
    new THREE.Vector2( 0, 0 ),
    new THREE.Vector2( 1.3, 0 ),
    new THREE.Vector2( 0, 10 )
  ];
  var arrow = new THREE.LatheGeometry( arrowPoints, 3 );

  // Rotate arrow and scale to correct proportions
  m = new THREE.Matrix4();
  m.makeRotationX( Math.PI );
  arrow.applyMatrix( m );
  m.makeScale( 1, 1, 0.2 );
  arrow.applyMatrix( m );

  var triangle = new THREE.CircleGeometry( 1, 3 );

  var font = new THREE.Font( JSON.parse( gentilisBold ) );

  var createText = function( t ) {
    var text = new THREE.TextGeometry( t, {
      size: 2,
      height: 0.04,
      font: font,
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
    new THREE.Vector2( flatRingRadius + 0.1, 0 ),
    new THREE.Vector2( flatRingRadius - 0.1, 0 )
  ];
  var flatRing = new THREE.LatheGeometry( flatRingPoints, 64 );
  m = new THREE.Matrix4();
  m.makeRotationX( Math.PI / 2);
  flatRing.applyMatrix( m );

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
