define( ["three"], function ( THREE ) {
  return {
    blob: new THREE.SphereGeometry( 0.5, 32, 32 ),
    ring: new THREE.TorusGeometry( 11, 2, 32, 100 ),
    smallRing: new THREE.TorusGeometry( 0.8, 0.1, 16, 32 )
  };
} );
