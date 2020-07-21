'use strict';
(function () {
  var makeElementsDisabled = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].setAttribute('disabled', true);
    }
  };

  var makeElementsAvailable = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].removeAttribute('disabled');
    }
  };

  var getRandomArrayIndex = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomNumber = function (min, max) {
    var random = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(random);
  };

  var getRandomArray = function (array) {
    return array.slice(Math.round(Math.random() * array.length));
  };

  var hideElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.add('hidden');
    }
  };

  var showElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('hidden');
    }
  };

  var adressInput = document.querySelector('#address');
  var setAddressValue = function () {
    var locationX = Math.round(window.data.MAP_PIN_WIDTH / 2 + window.htmlSelectors.mapPinMain.offsetLeft);
    var locationY = Math.round(window.data.MAP_PIN_HEIHGT / 2 + window.htmlSelectors.mapPinMain.offsetTop);
    adressInput.value = locationX + ', ' + locationY;
  };

  var MapPinMainCoords = {
    top: 375,
    left: 570
  };
  var returnMapPinMainPosition = function () {
    window.htmlSelectors.mapPinMain.style.top = MapPinMainCoords.top + 'px';
    window.htmlSelectors.mapPinMain.style.left = MapPinMainCoords.left + 'px';
  };

  var setActiveAddressValue = function () {
    var locationX = Math.round(window.data.MAP_PIN_WIDTH / 2 + window.htmlSelectors.mapPinMain.offsetLeft);
    var locationY = Math.round(window.data.MAP_PIN_HEIHGT + window.data.MAP_PIN_TAIL + window.htmlSelectors.mapPinMain.offsetTop);
    adressInput.value = locationX + ', ' + locationY;
  };

  var removePhotos = function () {
    var previewAvatar = document.querySelector('.ad-form-header__preview img');
    var previewPhoto = document.querySelector('.ad-form__photo');
    previewAvatar.src = 'img/muffin-grey.svg';
    previewPhoto.innerHTML = '';
  };

  var refreshFilter = function () {
    var mapFilters = document.querySelectorAll('.map__filter');
    var housingFeatures = document.querySelectorAll('.map__checkbox');

    mapFilters.forEach(function (item) {
      item.value = 'any';
    });
    housingFeatures.forEach(function (item) {
      item.checked = false;
    });
  };

  var disablePage = function () {
    window.htmlSelectors.map.classList.add('map--faded');
    window.htmlSelectors.adForm.classList.add('ad-form--disabled');
    var pinsCollection = document.querySelectorAll('.map__pin:not(.map__pin--main');
    hideElements(pinsCollection);
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
    removePhotos();
    refreshFilter();
    returnMapPinMainPosition();
    window.htmlSelectors.adForm.reset();
    window.utils.setAddressValue();
  };

  window.utils = {
    makeElementsDisabled: makeElementsDisabled,
    makeElementsAvailable: makeElementsAvailable,
    getRandomArrayIndex: getRandomArrayIndex,
    getRandomNumber: getRandomNumber,
    getRandomArray: getRandomArray,
    hideElements: hideElements,
    showElements: showElements,
    setAddressValue: setAddressValue,
    setActiveAddressValue: setActiveAddressValue,
    disablePage: disablePage
  };
})();
