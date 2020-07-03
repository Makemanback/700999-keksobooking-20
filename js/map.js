'use strict';

(function () {
  window.utils.makeElementsDisabled(window.htmlSelectors.mapFeatures);
  window.utils.makeElementsDisabled(window.htmlSelectors.mapFiltersSelects);
  window.utils.hideElements(window.renderedSelectors.mapPinsCollection);

  var onClickOpenCard = function (element, data) {
    element.addEventListener('click', function () {
      window.card.removeCard();
      window.card.renderMapCard(data);
    });
  };

  var openCard = function () {
    window.pin.ads.forEach(function (item, index) {
      onClickOpenCard(window.renderedSelectors.mapPinsCollection[index], item);
    });
  };

  openCard();

  var makePageActive = function () {

    window.htmlSelectors.map.classList.remove('map--faded');
    window.htmlSelectors.adForm.classList.remove('ad-form--disabled');
    window.utils.makeElementsAvailable(window.htmlSelectors.mapFeatures);
    window.utils.makeElementsAvailable(window.htmlSelectors.mapFilter);
    window.utils.showElements(window.renderedSelectors.mapPinsCollection);
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
