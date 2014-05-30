define( ["three", "gentilisBold"], function ( THREE ) {
  var plateRadius = 10.8;
  var chromeRadius = 1.2;

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
    cover: new THREE.SphereGeometry( plateRadius, 32, 16, 0, Math.PI ),
    flatRing: flatRing,
    flatRingRadius: flatRingRadius,
    backplate: new THREE.CircleGeometry( plateRadius, 32 ),
    blob: new THREE.SphereGeometry( 1, 32, 32 ),
    plateRadius: plateRadius,
    ring: new THREE.TorusGeometry( plateRadius + chromeRadius / 2, chromeRadius, 32, 100 ),
    smallRing: new THREE.TorusGeometry( 1.3, 0.1, 16, 32 ),
    text: createText,
    triangle: triangle
  };
} );
