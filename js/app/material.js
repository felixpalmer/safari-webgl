define( ["three", "texture"], function ( THREE, texture ) {
  var flatWithColor = function( color ) {
    return new THREE.MeshPhongMaterial( {
      color: color,
      emissive: new THREE.Color( "#232323" ),
      specular: new THREE.Color( "#ccccff" ),
      shading: THREE.SmoothShading,
      shininess: 40
    } );
  };

  return {
    basic: new THREE.MeshBasicMaterial( { color: "#00ff00" } ),
    chrome: new THREE.MeshStandardMaterial( {
      color: new THREE.Color( "#c4c4d4" ),
      emissive: new THREE.Color( "#121515" ),
      specular: new THREE.Color( "#d4d4ff" ),

      bumpMap: texture.brushed,
      bumpScale: 0.003,
      envMap: texture.sky,
      metalness: 0.5,
      shininess: 15
    } ),
    cover: new THREE.MeshPhongMaterial( {
      color: new THREE.Color( "#000000" ),
      emissive: new THREE.Color( "#000000" ),
      specular: new THREE.Color( "#ffffff" ),

      blending: THREE.AdditiveBlending,
      //blending: THREE.NoBlending,
      opacity: 0.95,
      shading: THREE.SmoothShading,
      transparent: true,

      combine: THREE.MixOperation,
      envMap: texture.sky,
      reflectivity: 0.29,
      shininess: 190
    } ),
    flatBlue: flatWithColor( new THREE.Color( "#1557fb" ) ),
    flatGrey: flatWithColor( new THREE.Color( "#979797" ) ),
    flatRed: flatWithColor( new THREE.Color( "#ff2700" ) ),
    flatWhite: flatWithColor( new THREE.Color( "#ffffff" ) ),
    sky: new THREE.MeshBasicMaterial( { map: texture.sky } ),
    solid: new THREE.MeshLambertMaterial( {
      color: 0x00dcdc,
      shading: THREE.SmoothShading
    }),
    wire: new THREE.MeshBasicMaterial( { wireframe: true } ),
    wood: new THREE.MeshPhongMaterial( {
      emissive: new THREE.Color( "#000000" ),
      specular: new THREE.Color( "#b15712" ),
      shininess: 10,
      map: texture.wood,
      bumpScale: 0.06,
      bumpMap: texture.wood
    } ),
    world: new THREE.MeshBasicMaterial( { map: texture.world } )
  };
} );
