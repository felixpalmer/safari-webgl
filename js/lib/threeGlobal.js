define( ['threeCore'], function ( THREE ) {
  // This is pretty messy, but for now the modules we are including with
  // shims, do not support a non-global THREE Object. To allow these to work,
  // expose the THREE object on the window. By having threeCore depend on this
  // module, we can be sure all the shimmed modules will be loaded after
  // TODO: move to a model where we don't need all this mess
  window.THREE = THREE;
  return THREE;
} );
