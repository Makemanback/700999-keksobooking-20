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

  // случайное значение из диапазона
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

  var setAddressValue = function () {
    var locationX = Math.round(window.data.MAP_PIN_WIDTH / 2 + window.htmlSelectors.mapPinMain.offsetLeft);
    var locationY = Math.round(window.data.MAP_PIN_HEIHGT + window.htmlSelectors.mapPinMain.offsetTop);
    window.htmlSelectors.adressInput.value = locationX + ', ' + locationY;
  };

  window.utils = {
    makeElementsDisabled: makeElementsDisabled,
    makeElementsAvailable: makeElementsAvailable,
    getRandomArrayIndex: getRandomArrayIndex,
    getRandomNumber: getRandomNumber,
    getRandomArray: getRandomArray,
    hideElements: hideElements,
    showElements: showElements,
    setAddressValue: setAddressValue
  };
})();
