/*global shower*/
// Start the app
require( ['detector', 'app', 'container'], function ( Detector, app, container ) {
  if ( ! Detector.webgl ) {
    Detector.addGetWebGLMessage();
    container.innerHTML = "";
  }

  app.init();
  app.draw();
  var tick = function() {
    window.requestAnimationFrame( tick );
    if ( shower.isSlideMode() && shower.getCurrentSlideNumber() === 0 ) {
      app.draw();
    }
  };
  tick();
} );
