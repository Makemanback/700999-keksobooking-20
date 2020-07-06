'use strict';

(function () {
  var workingArea = {
    startX: window.htmlSelectors.map.offsetLeft + window.data.MAP_PIN_WIDTH / 2,
    endX: window.htmlSelectors.map.offsetWidth - window.data.MAP_PIN_WIDTH / 2 + window.htmlSelectors.map.offsetLeft,
    startY: 130,
    endY: 630 - window.data.MAP_PIN_HEIHGT
  };

  window.htmlSelectors.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      if (moveEvt.clientX > workingArea.startX &&
          moveEvt.clientX < workingArea.endX &&
          moveEvt.clientY > workingArea.startY &&
          moveEvt.clientY < workingArea.endY) {

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        window.utils.setAddressValue();

        window.htmlSelectors.mapPinMain.style.top = (window.htmlSelectors.mapPinMain.offsetTop - shift.y) + 'px';
        window.htmlSelectors.mapPinMain.style.left = (window.htmlSelectors.mapPinMain.offsetLeft - shift.x) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          window.htmlSelectors.mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        window.htmlSelectors.mapPinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
