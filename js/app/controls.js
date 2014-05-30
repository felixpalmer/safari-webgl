define( ["three", "camera", "container"], function( THREE, camera, container ) { 
  var controls = new THREE.TrackballControls( camera, container );
  controls.dynamicDampingFactor = 0.07;
  controls.minDistance = 8;
  controls.rotateSpeed = 0.5;
  controls.zoomSpeed = 0.6;
  return controls;
} );
