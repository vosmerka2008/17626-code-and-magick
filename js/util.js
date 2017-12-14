'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
    /*getRandomIndex: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }*/
  };
})();

/*
'use strict';

(function () {

  var KEY_CODE_ESCAPE = 27;
  var KEY_CODE_ENTER = 13;

  window.util = {
    isEscapePressed: function (evt, action) {
      if (evt.keyCode === KEY_CODE_ESCAPE) {
        action();
      }
    },

    isEnterPressed: function (evt, action) {
      if (evt.keyCode === KEY_CODE_ENTER) {
        action();
      }
    },

    getRandomValue: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    getMaxElement: function (arr) {
      var maxItem = -1;

      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (item > maxItem) {
          maxItem = item;
        }
      }
      return maxItem;
    }
  };
})();
*/
