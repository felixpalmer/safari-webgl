/*global shower*/
// Start the app
require( ['detector', 'app', 'container', 'renderer'], function ( Detector, app, container, renderer ) {
  if ( ! Detector.webgl ) {
    Detector.addGetWebGLMessage();
    container.innerHTML = "";
  }

  app.init();
  app.draw();
  var lastSlideNumber = -1;
  var rendering = false;
  var tick = function() {
    window.requestAnimationFrame( tick );
    if ( shower.isSlideMode() ) {
      var slideNumber = shower.getCurrentSlideNumber();
      if ( slideNumber !== lastSlideNumber ) {
        // Have changed slide
        lastSlideNumber = slideNumber;

        // Check for presence of threejs container in new slide
        var slideId = shower.getSlideHash( slideNumber ).slice( 1 );
        var c = document.querySelector( "[id='" + slideId + "'] .threejs-container" );
        if ( c ) {
          rendering = true;
          renderer.setContainer( c );
        } else {
          rendering = false;
        }

        // Set parameters for specific slide
        if ( slideNumber === 0 ) {
          app.spin = true;
        }
        if ( slideNumber === 1 ) {
          app.spin = false;
        }
      }

      if ( rendering ) {
        app.draw();
      }
    }
  };
  tick();
} );
