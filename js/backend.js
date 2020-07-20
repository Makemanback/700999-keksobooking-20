'use strict';

(function () {
  var load = function (onLoad, onErrorPopup) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.data.StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onErrorPopup('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onErrorPopup('Произошла ошибка соединения');
    });

    xhr.open('GET', window.data.URL);
    xhr.send();
  };

  var onErrorPopup = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; color: white; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  load(window.card.onDownload, onErrorPopup);

  var onSuccess = function () {
    var fragmentThird = document.createDocumentFragment();
    fragmentThird.appendChild(window.htmlSelectors.successTemplate.cloneNode(true));
    window.htmlSelectors.map.insertBefore(fragmentThird, window.htmlSelectors.mapFilters);

    var success = document.querySelector('.success');

    var closeMessage = function (evt) {
      evt.preventDefault();
      success.classList.add('hidden');
    };

    document.addEventListener('click', closeMessage);

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        success.classList.add('hidden');
      }
    });
  };

  var onErrorMessage = function () {
    var fragmentFourth = document.createDocumentFragment();
    fragmentFourth.appendChild(window.htmlSelectors.errorTemplate.cloneNode(true));
    window.htmlSelectors.map.insertBefore(fragmentFourth, window.htmlSelectors.mapFilters);

    var error = document.querySelector('.error');

    var closeMessage = function (evt) {
      evt.preventDefault();
      error.classList.add('hidden');
    };

    document.addEventListener('click', closeMessage);

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        closeMessage(evt);
      }
    });
  };

  var save = function (data, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.data.StatusCode.OK) {
        onLoad(xhr.response);
        onSuccess();
      } else {
        onErrorMessage();
      }
    });
    xhr.addEventListener('error', function () {
      onErrorPopup('Произошла ошибка соединения');
    });

    xhr.open('POST', window.data.SEND_URL);
    xhr.send(data);
  };

  window.backend = {
    save: save
  };
})();
