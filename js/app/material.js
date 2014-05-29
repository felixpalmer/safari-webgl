define( ["three", "cubeCamera", "shader!simple.vert", "shader!simple.frag", "texture"], function ( THREE, cubeCamera, simpleVert, simpleFrag, texture ) {
  var arrowWithColor = function( color ) {
    return new THREE.MeshPhongMaterial( {
      color: color,
      emissive: new THREE.Color( "#232323" ),
      specular: new THREE.Color( "#ccccff" ),
      shading: THREE.FlatShading,
      shininess: 40
    } );
  };

  return {
    arrowRed: arrowWithColor( new THREE.Color( "#ff2700" ) ),
    arrowWhite: arrowWithColor( new THREE.Color( "#ffffff" ) ),
    chrome: new THREE.MeshPhongMaterial( {
      color: new THREE.Color( "#c4c4d4" ),
      emissive: new THREE.Color( "#121515" ),
      specular: new THREE.Color( "#d4d4ff" ),

      bumpMap: texture.grass,
      bumpScale: 0.003,
      envMap: cubeCamera.renderTarget,
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
      envMap: cubeCamera.renderTarget,
      reflectivity: 0.29,
      shininess: 190
    } ),
    grass: new THREE.MeshBasicMaterial( { map: texture.grass } ),
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
    world: new THREE.MeshBasicMaterial( { map: texture.world } )
  };
} );
