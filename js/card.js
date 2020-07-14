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

    var filter = document.querySelector('.map__filters');

    var housingType = document.querySelector('#housing-type');
    var updatePinsHousing = function () {

      removeCard();
      var fragment = document.createDocumentFragment();
      var filteredAds = ads.filter(function (type) {
        return (
          type.offer.type === housingType.value
        );
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

      if (housingType.value === 'any') {
        for (var j = 0; j < PINS_QUANTITY; j++) {
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

    var housingPrice = document.querySelector('#housing-price');
    var updatePinsPrice = function () {
      removeCard();
      var fragment = document.createDocumentFragment();
      var filteredAds;

      for (var i = 0; i < ads.length; i++) {
        if (housingPrice.value === 'middle' && (ads[i].offer.price <= 50000 && ads[i].offer.price >= 10000)) {
          fragment.appendChild(window.card.createAd(ads[i]));
          filteredAds = ads.filter(function (type) {
            return type.offer.price >= 10000 && type.offer.price <= 50000;
          });
        } else if (housingPrice.value === 'low' && ads[i].offer.price < 10000) {
          fragment.appendChild(window.card.createAd(ads[i]));
          filteredAds = ads.filter(function (type) {
            return type.offer.price < 10000;
          });
        } else if (housingPrice.value === 'high' && ads[i].offer.price > 50000) {
          fragment.appendChild(window.card.createAd(ads[i]));
          filteredAds = ads.filter(function (type) {
            return type.offer.price > 50000;
          });
        }
      }

      if (housingPrice.value === 'any') {
        for (var j = 0; j < PINS_QUANTITY; j++) {
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

    var housingRooms = document.querySelector('#housing-rooms');
    var updatePinsRooms = function () {
      removeCard();
      var fragment = document.createDocumentFragment();
      var filteredAds;

      for (var i = 0; i < ads.length; i++) {
        if (housingRooms.value === '1' && ads[i].offer.rooms === 1) {
          fragment.appendChild(window.card.createAd(ads[i]));
          filteredAds = ads.filter(function (type) {
            return type.offer.rooms === 1;
          });
        } else if (housingRooms.value === '2' && ads[i].offer.rooms === 2) {
          fragment.appendChild(window.card.createAd(ads[i]));
          filteredAds = ads.filter(function (type) {
            return type.offer.rooms === 2;
          });
        } else if (housingRooms.value === '3' && ads[i].offer.rooms === 3) {
          fragment.appendChild(window.card.createAd(ads[i]));
          filteredAds = ads.filter(function (type) {
            return type.offer.rooms === 3;
          });
        }
      }

      if (housingRooms.value === 'any') {
        for (var j = 0; j < PINS_QUANTITY; j++) {
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

    var housingGuests = document.querySelector('#housing-guests');
    var updatePinsGuests = function () {
      removeCard();
      var fragment = document.createDocumentFragment();
      var filteredAds;

      for (var i = 0; i < ads.length; i++) {
        if (housingGuests.value === '0' && ads[i].offer.guests === 0) {
          fragment.appendChild(window.card.createAd(ads[i]));
          filteredAds = ads.filter(function (type) {
            return type.offer.guests === 0;
          });
          console.log(filteredAds);
        } else if (housingGuests.value === '1' && ads[i].offer.guests === 1) {
          fragment.appendChild(window.card.createAd(ads[i]));
          filteredAds = ads.filter(function (type) {
            return type.offer.guests === 1;
          });
        } else if (housingGuests.value === '2' && ads[i].offer.guests === 2) {
          fragment.appendChild(window.card.createAd(ads[i]));
          filteredAds = ads.filter(function (type) {
            return type.offer.guests === 2;
          });
        }
      }

      if (housingGuests.value === 'any') {
        for (var j = 0; j < PINS_QUANTITY; j++) {
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

    var housingFeatures = document.querySelector('#housing-features');
    var featureWifi = document.querySelector('#filter-wifi');
    var featureDishwasher = document.querySelector('#filter-dishwasher');
    var featureParking = document.querySelector('#filter-parking');
    var featureWasher = document.querySelector('#filter-washer');
    var featureElevator = document.querySelector('#filter-elevator');
    var featureConditioner = document.querySelector('#filter-conditioner');

    var updatePinsFeatures = function () {
      removeCard();
      var fragment = document.createDocumentFragment();
      var filteredAds;

      for (var i = 0; i < ads.length; i++) {
        if (featureWifi.disabled === false && ads[i].offer.features.includes('wifi')) {
          fragment.appendChild(window.card.createAd(ads[i]));
          // console.log(ads[i]);
          filteredAds = ads[i];
          console.log(filteredAds);
        } else if (featureDishwasher.disabled === false && ads[i].offer.features.includes('dishwasher')) {
          fragment.appendChild(window.card.createAd(ads[i]));
          filteredAds = ads[i];
          console.log(filteredAds);
        } else if (featureParking.disabled === false && ads[i].offer.features.includes('parking')) {
          fragment.appendChild(window.card.createAd(ads[i]));
          filteredAds = ads[i];
          console.log(filteredAds);
        } else if (featureWasher.disabled === false && ads[i].offer.features.includes('washer')) {
          fragment.appendChild(window.card.createAd(ads[i]));
          filteredAds = ads[i];
          console.log(filteredAds);
        } else if (featureElevator.disabled === false && ads[i].offer.features.includes('elevator')) {
          fragment.appendChild(window.card.createAd(ads[i]));
          filteredAds = ads[i];
          console.log(filteredAds);
        } else if (featureConditioner.disabled === false && ads[i].offer.features.includes('conditioner')) {
          fragment.appendChild(window.card.createAd(ads[i]));
          filteredAds = ads[i];
          console.log(filteredAds);
        }
      }

      if (housingFeatures.value === 'any') {
        for (var j = 0; j < PINS_QUANTITY; j++) {
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

    var newPinsHousing = function (evt) {
      evt.preventDefault();
      removePins();
      updatePinsHousing();
    };

    var newPinsPrice = function (evt) {
      evt.preventDefault();
      removePins();
      updatePinsPrice();
    };

    var newPinsRooms = function (evt) {
      evt.preventDefault();
      removePins();
      updatePinsRooms();
    };

    var newPinsGuests = function (evt) {
      evt.preventDefault();
      removePins();
      updatePinsGuests();
    };

    var newPinsFeatures = function (evt) {
      evt.preventDefault();
      removePins();
      updatePinsFeatures();
    };


    // filter.addEventListener('change', newPinsHousing);
    // filter.addEventListener('change', newPinsPrice);
    // filter.addEventListener('change', newPinsRooms);
    // filter.addEventListener('change', newPinsGuests);
    filter.addEventListener('change', newPinsFeatures);


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
