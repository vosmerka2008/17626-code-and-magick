'use strict';

(function () {
  window.colorizeElement = function (element, colors, action) {
    action(element, window.setup.getRandomIndex(colors));
  };
})();
