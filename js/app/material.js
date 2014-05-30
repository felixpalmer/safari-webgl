define( ["three", "cubeCamera", "shader!simple.vert", "shader!simple.frag", "texture"], function ( THREE, cubeCamera, simpleVert, simpleFrag, texture ) {
  var flatWithColor = function( color ) {
    return new THREE.MeshPhongMaterial( {
      color: color,
      emissive: new THREE.Color( "#232323" ),
      specular: new THREE.Color( "#ccccff" ),
      shading: THREE.FlatShading,
      shininess: 40
    } );
  };

  return {
    chrome: new THREE.MeshPhongMaterial( {
      color: new THREE.Color( "#c4c4d4" ),
      emissive: new THREE.Color( "#121515" ),
      specular: new THREE.Color( "#d4d4ff" ),

      bumpMap: texture.brushed,
      bumpScale: 0.003,
      envMap: texture.sky,
      metal: true,
      shininess: 15
    } ),
    cover: new THREE.MeshPhongMaterial( {
      ambient: new THREE.Color( "#000000" ),
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
    flatBlue: flatWithColor( new THREE.Color( "#0091cb" ) ),
    flatGrey: flatWithColor( new THREE.Color( "#979797" ) ),
    flatRed: flatWithColor( new THREE.Color( "#ff2700" ) ),
    flatWhite: flatWithColor( new THREE.Color( "#ffffff" ) ),
    sky: new THREE.MeshBasicMaterial( { map: texture.sky } ),
    shader: new THREE.ShaderMaterial( {
      uniforms: {
        uColor: { type: "c", value: new THREE.Color( "#ff0000" ) }
      },
      vertexShader: simpleVert.value,
      fragmentShader: simpleFrag.value
    }),
    solid: new THREE.MeshLambertMaterial( {
      color: 0x00dcdc,
      shading: THREE.FlatShading
    }),
    wire: new THREE.MeshBasicMaterial( { wireframe: true } ),
    wood: new THREE.MeshPhongMaterial( {
      shininess: 0,
      map: texture.wood
    } ),
    world: new THREE.MeshBasicMaterial( { map: texture.world } )
  };
} );
