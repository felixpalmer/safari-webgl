define( ["three"], function ( THREE ) {
  var texturePath = "js/textures/";
  var brushed = THREE.ImageUtils.loadTexture( texturePath + "brushed.png" );
  brushed.repeat = new THREE.Vector2( 20, 4 );
  brushed.wrapS = THREE.RepeatWrapping;
  brushed.wrapT = THREE.RepeatWrapping;
  var wood = THREE.ImageUtils.loadTexture( texturePath + "wood.jpg" );
  wood.repeat = new THREE.Vector2( 10, 10 );
  wood.wrapS = THREE.RepeatWrapping;
  wood.wrapT = THREE.RepeatWrapping;
  return {
    brushed: brushed,
    sky: THREE.ImageUtils.loadTexture( texturePath + "sky.jpg" ),
    wood: wood,
    world: THREE.ImageUtils.loadTexture( texturePath + "world2.jpg" )
  };
} );
