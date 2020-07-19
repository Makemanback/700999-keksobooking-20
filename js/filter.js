'use strict';

(function () {
  window.removePins = function () {
    var PinsCollection = document.querySelectorAll('.map__pin:not(.map__pin--main');
    for (var i = PinsCollection.length; i--;) {
      window.htmlSelectors.mapPins.removeChild(PinsCollection[i]);
    }
  };

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var featureWifi = document.querySelector('#filter-wifi');
  var featureDishwasher = document.querySelector('#filter-dishwasher');
  var featureParking = document.querySelector('#filter-parking');
  var featureWasher = document.querySelector('#filter-washer');
  var featureElevator = document.querySelector('#filter-elevator');
  var featureConditioner = document.querySelector('#filter-conditioner');

  window.onFilterChange = function (ads) {
    var filteredByType = ads.filter(function (ad) {
      if (housingType.value === 'any') {
        return ad;
      }
      return ad.offer.type === housingType.value;
    });

    var filteredByPrice = filteredByType.filter(function (ad) {
      if (housingPrice.value === 'middle') {
        return (ad.offer.price >= 10000 && ad.offer.price <= 50000);
      } else if (housingPrice.value === 'low') {
        return (ad.offer.price < 10000);
      } else if (housingPrice.value === 'high') {
        return (ad.offer.price > 50000);
      }
      return filteredByType;
    });

    var filteredByRooms = filteredByPrice.filter(function (ad) {
      if (housingRooms.value === 'any') {
        return filteredByPrice;
      }
      return ad.offer.rooms.toString() === housingRooms.value;
    });

    var filteredByGuests = filteredByRooms.filter(function (ad) {
      if (housingGuests.value === 'any') {
        return filteredByRooms;
      }
      return ad.offer.guests.toString() === housingGuests.value;
    });

    var filteredByWifi = filteredByGuests.filter(function (ad) {
      if (featureWifi.checked === true) {
        return ad.offer.features.includes('wifi');
      }
      return filteredByGuests;
    });

    var filteredByDishwasher = filteredByWifi.filter(function (ad) {
      if (featureDishwasher.checked === true) {
        return ad.offer.features.includes('dishwasher');
      }
      return filteredByWifi;
    });

    var filteredByParking = filteredByDishwasher.filter(function (ad) {
      if (featureParking.checked === true) {
        return ad.offer.features.includes('parking');
      }
      return filteredByDishwasher;
    });

    var filteredByWasher = filteredByParking.filter(function (ad) {
      if (featureWasher.checked === true) {
        return ad.offer.features.includes('washer');
      }
      return filteredByParking;
    });

    var filteredByElevator = filteredByWasher.filter(function (ad) {
      if (featureElevator.checked === true) {
        return ad.offer.features.includes('washer');
      }
      return filteredByWasher;
    });

    var filteredByConditioner = filteredByElevator.filter(function (ad) {
      if (featureConditioner.checked === true) {
        return ad.offer.features.includes('washer');
      }
      return filteredByElevator;
    });

    return filteredByConditioner.slice(0, 5);
  };

})();
