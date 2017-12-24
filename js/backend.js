'use strict';

(function () {
  var PAGE_NOT_FOUND = 404;
  var BAD_REQUEST = 400;
  var UNAUTHORIZED = 401;
  var OK = 200;
  var SERVER_URL = 'https://1510.dump.academy/code-and-magick';

  var setup = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case OK:
          onSuccess(xhr.response);
          break;
        case BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case PAGE_NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
          break;
      }
      if (error) {
        onError(error);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 30000;

    return xhr;
  };

  window.backend = {
    save: function (data, onSuccess, onError) {
      var xhr = setup(onSuccess, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },

    load: function (onSuccess, onError) {
      var xhr = setup(onSuccess, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    }
  };
})();
