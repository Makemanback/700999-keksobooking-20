'use strict';

(function () {
  var PINS_QUANTITY = 5;

  // функция фото
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

  // функция фич
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

  window.renderPins = function (ads) {

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < PINS_QUANTITY; i++) {
      fragment.appendChild(window.card.createAd(ads[i]));
    }
    window.htmlSelectors.mapPins.appendChild(fragment);
  };

  var successHandler = function (ads) {
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
      for (var i = 0; i < pinsCollection.length; i++) {
        onClickOpenCard(pinsCollection[i], ads[i]);
      }
    };

    var housingType = document.querySelector('#housing-type');

    var updatePins = function () {

      removeCard();
      var fragment = document.createDocumentFragment();
      var filteredAds = ads.filter(function (type) {
        return type.offer.type === housingType.value;
      });

      for (var i = 0; i < ads.length; i++) {
        if (housingType.value === 'house' && ads[i].offer.type === housingType.value) {
          fragment.appendChild(window.card.createAd(ads[i]));
        } else if (housingType.value === 'bungalo' && ads[i].offer.type === housingType.value) {
          fragment.appendChild(window.card.createAd(ads[i]));
        } else if (housingType.value === 'flat' && ads[i].offer.type === housingType.value) {
          fragment.appendChild(window.card.createAd(ads[i]));
        } else if (housingType.value === 'palace' && ads[i].offer.type === housingType.value) {
          fragment.appendChild(window.card.createAd(ads[i]));
        }
      }

      for (var j = 0; j < PINS_QUANTITY; j++) {
        if (housingType.value === 'any') {
          fragment.appendChild(window.card.createAd(ads[j]));
          filteredAds = ads;
        }
      }

      window.htmlSelectors.mapPins.appendChild(fragment);

      var secondPinsCollection = document.querySelectorAll('.map__pin:not(.map__pin--main');

      var updateCard = function () {
        for (var k = 0; k < secondPinsCollection.length; k++) {
          onClickOpenCard(secondPinsCollection[k], filteredAds[k]);
        }
      };
      updateCard();
    };

    var removePins = function () {
      var thirdPinsCollection = document.querySelectorAll('.map__pin:not(.map__pin--main');
      for (var i = thirdPinsCollection.length; i--;) {
        window.htmlSelectors.mapPins.removeChild(thirdPinsCollection[i]);
      }
    };

    var newPins = function (evt) {
      evt.preventDefault();
      removePins();
      updatePins();
    };

    housingType.addEventListener('change', newPins);

    openCard();
  };

  window.card = {
    getPhotos: getPhotos,
    createFeatures: createFeatures,
    createAd: createAd,
    createMapCard: createMapCard,
    successHandler: successHandler
  };
})();
