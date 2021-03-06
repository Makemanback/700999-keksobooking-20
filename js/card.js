'use strict';

(function () {
  var PINS_QUANTITY = 5;

  var getPhotos = function (array, block) {
    var fragmentPhoto = document.createDocumentFragment();

    block.innerHTML = '';

    for (var i = 0; i < array.length; i++) {
      var photo = document.createElement('img');
      photo.src = array[i];
      photo.width = 45;
      photo.classList.add('popup__photo');

      fragmentPhoto.appendChild(photo);
    }

    return block.appendChild(fragmentPhoto);
  };

  var fragmentFeatures = document.createDocumentFragment();
  var createFeatures = function (featuresList) {
    featuresList.forEach(function (feature) {
      var featureElement = document.createElement('li');
      featureElement.className = 'popup__feature popup__feature--' + feature;
      fragmentFeatures.appendChild(featureElement);
      return featureElement;
    });
    return fragmentFeatures;
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
    var mapCardPhotosContainer = mapCard.querySelector('.popup__photos');

    mapCardTitle.textContent = ad.offer.title;
    mapCardAdress.textContent = ad.offer.address;
    mapCardPrice.textContent = ad.offer.price + '₽/ночь';
    mapCardCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    mapCardTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    mapCardDescription.textContent = ad.offer.description;
    mapCardAvatar.src = ad.author.avatar;

    mapCardFeaturesContainer.innerHTML = '';
    mapCardFeaturesContainer.appendChild(window.card.createFeatures(ad.offer.features));

    window.card.getPhotos(ad.offer.photos, mapCardPhotosContainer);

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

  window.renderPins = function (ads) {

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < PINS_QUANTITY; i++) {
      fragment.appendChild(window.card.createAd(ads[i]));
    }
    window.htmlSelectors.mapPins.appendChild(fragment);
  };

  var onDownload = function (ads) {
    window.renderPins(ads);

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
      fragmentSecond.appendChild(createMapCard(element));
      window.htmlSelectors.map.insertBefore(fragmentSecond, window.htmlSelectors.mapFilters);

      var popupClose = document.querySelector('.popup__close');

      var removeListener = function (global, local) {
        local.removeEventListener('keydown', resetPopupEnter);
        global.removeEventListener('keydown', resetPopupEsc);
        local.removeEventListener('click', resetPopupClick);
      };

      var resetPopupEnter = function (evt) {
        evt.preventDefault();
        if (evt.key === 'Enter') {
          removeCard();
        }
        removeListener(document, popupClose);
      };

      var resetPopupEsc = function (evt) {
        evt.preventDefault();
        if (evt.key === 'Escape') {
          removeCard();
        }
        removeListener(document, popupClose);
      };

      var resetPopupClick = function (evt) {
        evt.preventDefault();
        removeCard();
        removeListener(document, popupClose);
      };

      popupClose.addEventListener('keydown', resetPopupEnter);
      popupClose.addEventListener('click', resetPopupClick);
      document.addEventListener('keydown', resetPopupEsc);
    };

    var onClickOpenCard = function (element, data) {
      element.addEventListener('click', function () {
        removeCard();
        renderMapCard(data);
      });
    };

    var openCard = function () {
      for (var i = 0; i < pinsCollection.length; i++) {
        onClickOpenCard(pinsCollection[i], ads[i]);
      }
    };

    var filter = document.querySelector('.map__filters');

    var onPinsUpdate = function () {
      window.removePins();
      removeCard();
      window.filterChange(ads);

      var fragment = document.createDocumentFragment();
      for (var j = 0; j < window.filterChange(ads).length; j++) {
        fragment.appendChild(createAd(window.filterChange(ads)[j]));
      }
      window.htmlSelectors.mapPins.appendChild(fragment);

      var secondPinsCollection = document.querySelectorAll('.map__pin:not(.map__pin--main');
      var updateCard = function () {
        for (var k = 0; k < secondPinsCollection.length; k++) {
          onClickOpenCard(secondPinsCollection[k], window.filterChange(ads)[k]);
        }
      };
      updateCard();
    };

    filter.addEventListener('change', window.debounce(onPinsUpdate));
    openCard();
  };

  window.card = {
    PINS_QUANTITY: PINS_QUANTITY,
    getPhotos: getPhotos,
    createFeatures: createFeatures,
    createAd: createAd,
    createMapCard: createMapCard,
    onDownload: onDownload
  };
})();
