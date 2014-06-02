define( ["three"], function ( THREE ) {
  var texturePath = "js/textures/";
  var brushed = THREE.ImageUtils.loadTexture( texturePath + "brushed.png" );
  brushed.repeat = new THREE.Vector2( 20, 4 );
  brushed.wrapS = THREE.RepeatWrapping;
  brushed.wrapT = THREE.RepeatWrapping;

  //var sky = THREE.ImageUtils.loadTexture( texturePath + "sky.jpg", THREE.SphericalReflectionMapping );
  var urls = [
    texturePath + "sky.jpg",
    texturePath + "sky.jpg",
    texturePath + "sky.jpg",
    texturePath + "sky.jpg",
    texturePath + "sky.jpg",
    texturePath + "sky.jpg"
  ];
  var sky =  THREE.ImageUtils.loadTextureCube( urls );
  //sky.mapping = THREE.SphericalReflectionMapping;

  var wood = THREE.ImageUtils.loadTexture( texturePath + "wood.jpg" );
  wood.repeat = new THREE.Vector2( 13, 13 );
  wood.wrapS = THREE.RepeatWrapping;
  wood.wrapT = THREE.RepeatWrapping;
  var woodBump = THREE.ImageUtils.loadTexture( texturePath + "woodBump.jpg" );
  woodBump.repeat = new THREE.Vector2( 13, 13 );
  woodBump.wrapS = THREE.RepeatWrapping;
  woodBump.wrapT = THREE.RepeatWrapping;
  return {
    brushed: brushed,
    sky: sky,
    wood: wood,
    woodBump: woodBump,
    world: THREE.ImageUtils.loadTexture( texturePath + "world2.jpg" )
  };
} );
