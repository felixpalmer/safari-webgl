define( ["three", "container"], function ( THREE, container ) {
  container.innerHTML = "";
  var renderer = new THREE.WebGLRenderer( { clearColor: 0x000000 } );
  renderer.sortObjects = false;
  renderer.autoClear = false;
  renderer.shadowMapEnabled = true;
  renderer.shadowMapType = THREE.PCFShadowMap;

  // Allow changing of DOM element for renderer
  renderer.setContainer = function( newContainer ) {
    try {
      _container.removeChild( renderer.domElement );
    } catch ( e ) {

    }
    _container = newContainer;
    _container.appendChild( renderer.domElement );
  };
  var _container = container;
  renderer.setContainer( _container );

  // Update size on window resize
  renderer.updateSize = function () {
    renderer.setSize( _container.offsetWidth, _container.offsetHeight );
  };
  window.addEventListener( 'resize', renderer.updateSize, false );
  renderer.updateSize();

  return renderer;
} );
