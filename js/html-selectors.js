'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var mapFilter = document.querySelector('.map__filters');
  var mapFilters = document.querySelector('.map__filters-container');
  var mapFiltersSelects = document.querySelectorAll('.map__filter');
  var mapFeaturesFieldset = document.querySelector('.map__features');
  var mapFeatures = mapFeaturesFieldset.children;

  var adForm = document.querySelector('.ad-form');
  var adFormSubmit = document.querySelector('.ad-form__submit');
  var adFormTitle = document.querySelector('#title');
  var adFormType = document.querySelector('#type');
  var adFormPrice = document.querySelector('#price');
  var adFormReset = document.querySelector('.ad-form__reset');
  var adressInput = document.querySelector('#address');
  var roomNumber = document.querySelector('#room_number');
  var roomCapacity = document.querySelector('#capacity');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var successTemplate = document.querySelector('#success').content;
  var errorTemplate = document.querySelector('#error').content;


  window.htmlSelectors = {
    map: map,
    mapPinMain: mapPinMain,
    mapPins: mapPins,
    mapFilter: mapFilter,
    mapFilters: mapFilters,
    mapFiltersSelects: mapFiltersSelects,
    mapFeaturesFieldset: mapFeaturesFieldset,
    mapFeatures: mapFeatures,
    adForm: adForm,
    adFormSubmit: adFormSubmit,
    adFormTitle: adFormTitle,
    adFormType: adFormType,
    adFormPrice: adFormPrice,
    adressInput: adressInput,
    adFormReset: adFormReset,
    roomNumber: roomNumber,
    roomCapacity: roomCapacity,
    timeIn: timeIn,
    timeOut: timeOut,
    successTemplate: successTemplate,
    errorTemplate: errorTemplate
  };
})();
