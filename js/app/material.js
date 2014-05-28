define( ["three", "cubeCamera", "shader!simple.vert", "shader!simple.frag", "texture"], function ( THREE, cubeCamera, simpleVert, simpleFrag, texture ) {
  return {
    chrome: new THREE.MeshPhongMaterial( {
      color: new THREE.Color( "#c4c4d4" ),
      emissive: new THREE.Color( "#121515" ),
      specular: new THREE.Color( "#d4d4ff" ),
      shininess: 15,
      bumpMap: texture.grass,
      bumpScale: 0.01,
      envMap: cubeCamera.renderTarget
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
    world: new THREE.MeshBasicMaterial( { map: texture.world } ),
  };
} );
