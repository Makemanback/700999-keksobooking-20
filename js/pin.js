'use strict';

(function () {
  var ads = [];
  var createArray = function (array) {

    for (var i = 1; i <= window.data.ADS_QUANTITY; i++) {
      var addressX = window.utils.getRandomNumber(100, 1200);
      var addressY = window.utils.getRandomNumber(130, 630);

      array.push({
        'author': {
          'avatar': 'img/avatars/user0' + i + '.png'
        },
        'offer': {
          'title': window.utils.getRandomArrayIndex(window.data.titles),
          'address': addressX + ', ' + addressY,
          'price': window.utils.getRandomNumber(100, 10000),
          'type': window.utils.getRandomArrayIndex(window.data.type),
          'rooms': window.utils.getRandomNumber(1, 5),
          'guests': window.utils.getRandomNumber(1, 10),
          'checkin': window.utils.getRandomArrayIndex(window.data.checkin),
          'checkout': window.utils.getRandomArrayIndex(window.data.checkout),
          'features': window.utils.getRandomArray(window.data.features),
          'description': window.utils.getRandomArrayIndex(window.data.description),
          'photos': window.utils.getRandomArray(window.data.photos)
        },
        'location': {
          'x': addressX,
          'y': addressY
        }
      });
    }

    return array;
  };

  createArray(ads);

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

  var renderAds = function () {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < ads.length; j++) {
      fragment.appendChild(createAd(ads[j]));
    }
    window.htmlSelectors.mapPins.appendChild(fragment);
  };

  renderAds();

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

      var workingArea = {
        startX: 140,
        endX: 1280,
        startY: 130,
        endY: 430
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

  window.pin = {
    ads: ads,
    renderAds: renderAds
  };
})();
