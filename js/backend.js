'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  // var URL = 'server.json';
  var PINS_QUANTITY = 10;
  var StatusCode = {
    OK: 200,
    notSuppot: 501
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

  var adTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var createAd = function (ad) {

    var adItem = adTemplate.cloneNode(true);
    var adItemImage = adItem.querySelector('img');

    adItem.style.left = ad.location.x - window.data.AD_WIDTH / 2 + 'px';
    adItem.style.top = ad.location.y - window.data.AD_HEIGHT + 'px';

    adItemImage.src = ad.author.avatar;
    adItemImage.alt = ad.offer.title;
    return adItem;

  };

  var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');

  var createMapCard = function (ad) {

    var mapCard = cardTemplate.cloneNode(true);
    var mapCardTitle = mapCard.querySelector('.popup__title');
    var mapCardAdress = mapCard.querySelector('.popup__text--address');
    var mapCardPrice = mapCard.querySelector('.popup__text--price');
    var mapCardType = mapCard.querySelector('.popup__type');
    var mapCardCapacity = mapCard.querySelector('.popup__text--capacity');
    var mapCardTime = mapCard.querySelector('.popup__text--time');
    var mapCardDescription = mapCard.querySelector('.popup__description');
    var mapCardAvatar = mapCard.querySelector('.popup__avatar');
    var mapCardFeaturesContainer = mapCard.querySelector('.popup__features');
    var mapCardFeatures = mapCardFeaturesContainer.children;
    var mapCardPhotosContainer = mapCard.querySelector('.popup__photos');

    mapCardTitle.textContent = ad.offer.title;
    mapCardAdress.textContent = ad.offer.address;
    mapCardPrice.textContent = ad.offer.price + '₽/ночь';
    mapCardCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    mapCardTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    mapCardDescription.textContent = ad.offer.description;
    mapCardAvatar.src = ad.author.avatar;

    for (var i = mapCardFeatures.length; i--;) {
      mapCardFeaturesContainer.removeChild(mapCardFeatures[i]);
    }
    mapCardFeaturesContainer.appendChild(window.card.createFeatures(ad.offer.features));

    // фотографии
    window.card.getPhotos(ad.offer.photos, mapCardPhotosContainer);

    // типы жилья
    switch (ad.offer.type) {
      case ('flat'):
        mapCardType.textContent = 'квартира';
        break;
      case ('bungalo'):
        mapCardType.textContent = 'бунгало';
        break;
      case ('house'):
        mapCardType.textContent = 'дом';
        break;
      case ('palace'):
        mapCardType.textContent = 'дворец';
        break;
    }

    return mapCard;
  };

  var successHandler = function (ads) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < PINS_QUANTITY; i++) {
      fragment.appendChild(createAd(ads[i]));
    }
    window.htmlSelectors.mapPins.appendChild(fragment);

    var pinsCollection = document.querySelectorAll('.map__pin:not(.map__pin--main');

    window.utils.hideElements(pinsCollection);

    window.htmlSelectors.mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      window.utils.showElements(pinsCollection);
    });

    window.htmlSelectors.mapPinMain.addEventListener('keydown', function (evt) {
      evt.preventDefault();
      if (evt.key === 'Enter') {
        window.utils.showElements(pinsCollection);
      }
      window.htmlSelectors.mapPinMain.removeEventListener('keydown', function () {
        evt.preventDefault();
        if (evt.key === 'Enter') {
          window.utils.showElements(pinsCollection);
        }
      });
    });

    var removeCard = function () {
      if (window.htmlSelectors.map.querySelector('.map__card')) {
        window.htmlSelectors.map.querySelector('.map__card').remove();
      }
    };


    var renderMapCard = function (element) {
      var fragmentSecond = document.createDocumentFragment();
      fragmentSecond.appendChild(createMapCard(element));
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

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; color: white; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  load(successHandler, errorHandler);
})();
