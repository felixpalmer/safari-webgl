define( ["three"], function ( THREE ) {
  var texturePath = "js/textures/";
  return {
    grass: THREE.ImageUtils.loadTexture( texturePath + "grass.png" ),
    sky: THREE.ImageUtils.loadTexture( texturePath + "sky.jpg" )
  };
} );
