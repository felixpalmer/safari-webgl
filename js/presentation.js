/*global shower*/
// Start the app
require( ['detector', 'app', 'container', 'material', 'renderer'], function ( Detector, app, container, material, renderer ) {
  if ( ! Detector.webgl ) {
    Detector.addGetWebGLMessage();
    container.innerHTML = "";
  }

  var onHover = function() {
    renderer.setContainer( this );
  };
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
          c.removeEventListener( 'mouseover', onHover );
          c.addEventListener( 'mouseover', onHover );
          c.removeEventListener( 'mouseout', onHover );
          c.addEventListener( 'mouseout', onHover );
        } else {
          rendering = false;
        }

        // Reset scene
        app.spin = true;
        app.wireframe( false );
        app.highlight( null );
        material.chrome.bumpScale = 0.003;
        app.explode( false );

        // Set parameters for specific slide
        if ( slideNumber === 1 ) {
          app.spin = false;
        }
        var geomSlideStart = 9; // Bit crappy, should really have better way of referring to slides
        if ( slideNumber === geomSlideStart ) {
          app.explode( true );
        }
        if ( slideNumber === geomSlideStart + 1) {
          app.highlight( app.blob );
        }
        if ( slideNumber === geomSlideStart + 2 ) {
          app.highlight( app.smallRing );
        }
        if ( slideNumber === geomSlideStart + 3 ) {
          app.highlight( app.flatRing );
        }
        if ( slideNumber === geomSlideStart + 4 ) {
          app.highlight( app.ring );
        }
        if ( slideNumber === geomSlideStart + 5 ) {
          app.highlight( app.label );
        }
        var materialSlideStart = 15;
        if ( slideNumber === materialSlideStart ) {
          app.wireframe( true );
        }
        if ( slideNumber === materialSlideStart + 1 ) {
          //app.explode( true );
          app.setMaterial( material.basic, [app.blob, app.cover, app.ring, app.smallRing] );
        }
        if ( slideNumber === materialSlideStart + 2 ) {
          app.setMaterial( material.flatBlue, [app.blob, app.cover, app.ring, app.smallRing] );
        }
        if ( slideNumber === materialSlideStart + 3 ) {
          app.highlight( app.table, 7 );
        }
        if ( slideNumber === materialSlideStart + 4 ) {
          var t = 0;
          var bumpChange = function() {
            if ( shower.getCurrentSlideNumber() !== materialSlideStart + 4 ) {
              return;
            }
            t += 0.5;
            material.chrome.bumpScale = 0.002 - 0.002 * Math.cos( Math.PI * t );
            setTimeout( bumpChange, 1000 );
          };
          bumpChange();
          app.highlight( app.blob );
        }
        if ( slideNumber === materialSlideStart + 5 ) {
          app.highlight( app.ring, 17 );
        }
        if ( slideNumber === materialSlideStart + 6 ) {
          app.setMaterial( material.cover, [app.blob, app.backplate, app.cover, app.ring, app.smallRing] );
        }
      }

      if ( rendering ) {
        app.draw();
      }
    }
  };
  tick();
} );
