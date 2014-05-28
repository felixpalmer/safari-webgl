define( ["three"], function ( THREE ) {
  return {
    cube: new THREE.CubeGeometry( 200, 200, 200 ),
    sphere: new THREE.SphereGeometry( 200, 32, 16 )
  };
} );
