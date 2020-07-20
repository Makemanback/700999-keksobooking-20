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
    successTemplate: successTemplate,
    errorTemplate: errorTemplate
  };
})();
