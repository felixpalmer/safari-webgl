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
      emissiveIntensity: 0.1,
      bumpMap: texture.brushed,
      bumpScale: 0.005,
      envMap: texture.sky,
      envMapIntensity: 0.72,
      metalness: 0.8,
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
    solid: new THREE.MeshPhongMaterial( {
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
    worldold: new THREE.MeshBasicMaterial( {
      map: texture.world
    } ),
    world: new THREE.MeshStandardMaterial( {
      emissive: new THREE.Color( "#ffffff" ),
      emissiveIntensity: 0.1,
      specular: new THREE.Color( "#b15712" ),
      metalness: 0.8,
      reflectivity: 0.29,
      map: texture.world
    } )
  };
} );
