'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  // var URL = 'server.json';
  var PINS_QUANTITY = 10;
  var StatusCode = {
    OK: 200,
    notSuppot: 501,
    internalError: 500
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('GET', URL);
    xhr.send();
  };

  var successHandler = function (ads) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < PINS_QUANTITY; i++) {
      fragment.appendChild(window.card.createAd(ads[i]));
    }
    window.htmlSelectors.mapPins.appendChild(fragment);

    var pinsCollection = document.querySelectorAll('.map__pin:not(.map__pin--main');

    window.utils.hideElements(pinsCollection);

    window.htmlSelectors.mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      window.utils.showElements(pinsCollection);
    });


    var openMap = function (evt) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        window.utils.showElements(pinsCollection);
      }
    };

    window.htmlSelectors.mapPinMain.addEventListener('keydown', openMap);

    var removeCard = function () {
      if (window.htmlSelectors.map.querySelector('.map__card')) {
        window.htmlSelectors.map.querySelector('.map__card').remove();
      }
    };


    var renderMapCard = function (element) {
      var fragmentSecond = document.createDocumentFragment();
      fragmentSecond.appendChild(window.card.createMapCard(element));
      window.htmlSelectors.map.insertBefore(fragmentSecond, window.htmlSelectors.mapFilters);

      var popupClose = document.querySelector('.popup__close');

      popupClose.addEventListener('click', function () {
        removeCard();
      });
      popupClose.addEventListener('keydown', function (evt) {
        evt.preventDefault();
        if (evt.key === 'Enter') {
          removeCard();
        }
      });
      popupClose.removeEventListener('keydown', function (evt) {
        evt.preventDefault();
        if (evt.key === 'Enter') {
          removeCard();
        }
      });

      document.addEventListener('keydown', function (evt) {
        evt.preventDefault();
        if (evt.key === 'Escape') {
          removeCard();
        }
      });
    };

    var onClickOpenCard = function (element, data) {
      element.addEventListener('click', function () {
        removeCard();
        renderMapCard(data);
      });
    };

    var openCard = function () {
      ads.forEach(function (item, index) {
        onClickOpenCard(pinsCollection[index], item);
      });
    };

    openCard();
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; color: white; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  load(successHandler, onError);


  var successTemplate = document.querySelector('#success').content;

  var createSuccess = function () {
    var message = successTemplate.cloneNode(true);
    return message;
  };

  var onSuccess = function () {
    var fragmentThird = document.createDocumentFragment();
    fragmentThird.appendChild(createSuccess());
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

  var errorTemplate = document.querySelector('#error').content;

  var createError = function () {
    var message = errorTemplate.cloneNode(true);
    return message;
  };

  var onErrorMessage = function () {
    var fragmentFourth = document.createDocumentFragment();
    fragmentFourth.appendChild(createError());
    window.htmlSelectors.map.insertBefore(fragmentFourth, window.htmlSelectors.mapFilters);

    var error = document.querySelector('.error');

    var closeMessage = function (evt) {
      evt.preventDefault();
      error.classList.add('hidden');
    };

    document.addEventListener('click', closeMessage);

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        error.classList.add('hidden');
      }
    });
  };

  var onSubmit = function (evt) {
    save(new FormData(window.htmlSelectors.adForm), function () {
      window.htmlSelectors.map.classList.add('map--faded');
      window.htmlSelectors.adForm.classList.add('ad-form--disabled');
      var pinsCollection = document.querySelectorAll('.map__pin:not(.map__pin--main');
      window.utils.hideElements(pinsCollection);
      window.htmlSelectors.adForm.reset();
    });
    evt.preventDefault();
  };
  window.htmlSelectors.adForm.addEventListener('submit', onSubmit);

  var sendURL = 'https://javascript.pages.academy/keksobooking';

  var save = function (data, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
        onSuccess();
      } else {
        onErrorMessage();
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('POST', sendURL);
    xhr.send(data);
  };

})();
