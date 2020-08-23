var UTIL = (function (gen) {
  var domReady = function (funct) {
    document.addEventListener("DOMContentLoaded", function () {
        // console.log(typeof funct,"dev testing");
      if (typeof funct === "function") {
        funct();
      }
    },false);
  };

  //Public Method
  gen.domReady = domReady;
  return gen;
})(UTIL || {});