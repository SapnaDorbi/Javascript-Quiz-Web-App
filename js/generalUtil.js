var UTIL = (function (gen) {
  const domReady = function (funct) {
    document.addEventListener("DOMContentLoaded", function () {
        if (typeof funct === "function") {
          funct();
        }
    },false);
  };

  //Public Method
  gen.domReady = domReady;
  return gen;
})(UTIL || {});