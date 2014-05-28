define( ["three"], function ( THREE ) {
  return {
    backplate: new THREE.CircleGeometry( 9.1, 32 ),
    blob: new THREE.SphereGeometry( 1, 32, 32 ),
    ring: new THREE.TorusGeometry( 11, 2, 32, 100 ),
    smallRing: new THREE.TorusGeometry( 1.3, 0.1, 16, 32 )
  };
} );
