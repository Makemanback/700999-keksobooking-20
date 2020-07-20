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
    var locationY = Math.round(window.data.MAP_PIN_HEIHGT + window.htmlSelectors.mapPinMain.offsetTop);
    adressInput.value = locationX + ', ' + locationY;
  };

  var disablePage = function () {
    window.htmlSelectors.map.classList.add('map--faded');
    window.htmlSelectors.adForm.classList.add('ad-form--disabled');
    var pinsCollection = document.querySelectorAll('.map__pin:not(.map__pin--main');
    hideElements(pinsCollection);
    window.htmlSelectors.adForm.reset();
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
    disablePage: disablePage
  };
})();
