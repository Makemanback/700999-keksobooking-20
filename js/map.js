'use strict';

(function () {
  window.utils.makeElementsDisabled(window.htmlSelectors.mapFeatures);
  window.utils.makeElementsDisabled(window.htmlSelectors.mapFiltersSelects);

  var makePageActive = function () {
    window.htmlSelectors.map.classList.remove('map--faded');
    window.htmlSelectors.adForm.classList.remove('ad-form--disabled');
    window.utils.makeElementsAvailable(window.htmlSelectors.mapFeatures);
    window.utils.makeElementsAvailable(window.htmlSelectors.mapFilter);
  };

  var makeElementActive = function (evt) {
    if (evt.button === 0) {
      makePageActive();
    }
  };

  window.htmlSelectors.mapPinMain.addEventListener('mousedown', makeElementActive);
  window.htmlSelectors.mapPinMain.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      makePageActive();
    }
    window.htmlSelectors.mapPinMain.removeEventListener('keydown', function () {
      evt.preventDefault();
      if (evt.key === 'Enter') {
        makePageActive();
      }
    });
  });
})();
