'use strict';

(function () {
  var ADS_QUANTITY = 8;
  var AD_WIDTH = 50;
  var AD_HEIGHT = 70;
  var MAP_PIN_WIDTH = 65;
  var MAP_PIN_HEIHGT = 65;

  var titles = ['первый', 'второй', 'третий', 'четвертый', 'пятый', 'шестой', 'седьмой', 'восьмой'];
  var type = ['palace', 'flat', 'house', 'bungalo'];
  var checkin = ['12:00', '13:00', '14:00'];
  var checkout = checkin;
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var description = ['новая', 'модель', 'организационной', 'деятельности', 'позволяет', 'выполнять'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var ads = [];

  var StatusCode = {
    OK: 200,
    notSuppot: 501,
    internalError: 500
  };
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var URL = 'server.json';
  var sendURL = 'https://javascript.pages.academy/keksobooking';

  window.data = {
    ADS_QUANTITY: ADS_QUANTITY,
    AD_WIDTH: AD_WIDTH,
    AD_HEIGHT: AD_HEIGHT,
    MAP_PIN_WIDTH: MAP_PIN_WIDTH,
    MAP_PIN_HEIHGT: MAP_PIN_HEIHGT,
    titles: titles,
    type: type,
    checkin: checkin,
    checkout: checkout,
    features: features,
    description: description,
    photos: photos,
    ads: ads,
    StatusCode: StatusCode,
    URL: URL,
    sendURL: sendURL
  };
})();
