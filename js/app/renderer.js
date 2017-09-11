define( ["three", "camera", "container"], function ( THREE, camera, container ) {
  var renderer = new THREE.WebGLRenderer( { clearColor: 0x000000 } );
  renderer.sortObjects = false;
  renderer.autoClear = false;
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.shadowMap.type = THREE.PCFShadowMap;

  // Update size on window resize
  renderer.updateSize = function () {
    renderer.setSize( _container.offsetWidth, _container.offsetHeight );
    camera.aspect = _container.offsetWidth / _container.offsetHeight;
    camera.updateProjectionMatrix();
  };
  window.addEventListener( 'resize', renderer.updateSize, false );

  // Allow changing of DOM element for renderer
  renderer.setContainer = function( newContainer ) {
    try {
      _container.removeChild( renderer.domElement );
    } catch ( e ) {

    }
    _container = newContainer;
    _container.innerHTML = "";
    _container.appendChild( renderer.domElement );

    // Now that we have new element, need to update the size of renderer and camera aspect
    renderer.updateSize();
  };
  var _container = container;
  renderer.setContainer( _container );

  return renderer;
} );
