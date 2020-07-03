'use strict';

(function () {
  window.utils.setAddressValue();

  // валидация формы
  window.htmlSelectors.adFormTitle.setAttribute('required', true);
  window.htmlSelectors.adFormPrice.setAttribute('required', true);

  var setMinValue = function () {
    switch (window.htmlSelectors.adFormType.value) {
      case ('bungalo'):
        window.htmlSelectors.adFormPrice.setAttribute('min', 0);
        window.htmlSelectors.adFormPrice.setAttribute('placeholder', 0);
        break;
      case ('flat'):
        window.htmlSelectors.adFormPrice.setAttribute('min', 1000);
        window.htmlSelectors.adFormPrice.setAttribute('placeholder', 1000);
        break;
      case ('house'):
        window.htmlSelectors.adFormPrice.setAttribute('min', 5000);
        window.htmlSelectors.adFormPrice.setAttribute('placeholder', 5000);
        break;
      case ('palace'):
        window.htmlSelectors.adFormPrice.setAttribute('min', 10000);
        window.htmlSelectors.adFormPrice.setAttribute('placeholder', 10000);
        break;
    }
  };

  window.htmlSelectors.adFormType.addEventListener('change', function (evt) {
    evt.preventDefault();
    setMinValue();
  });

  var setRoomsToGuests = function () {
    if (window.htmlSelectors.roomNumber.value === '1' && (window.htmlSelectors.roomCapacity.value > window.htmlSelectors.roomNumber.value || window.htmlSelectors.roomCapacity.value === '0')) {
      window.htmlSelectors.roomNumber.setCustomValidity('Для 1 гостя');
    } else if (window.htmlSelectors.roomNumber.value === '2' && (window.htmlSelectors.roomCapacity.value > window.htmlSelectors.roomNumber.value || window.htmlSelectors.roomCapacity.value === '0')) {
      window.htmlSelectors.roomNumber.setCustomValidity('Для 2 гостей или для 1 гостя');
    } else if (window.htmlSelectors.roomNumber.value === '3' && window.htmlSelectors.roomCapacity.value === '0') {
      window.htmlSelectors.roomNumber.setCustomValidity('Для 3 гостей, для 2 гостей или для 1 гостя');
    } else if (window.htmlSelectors.roomNumber.value === '100') {
      window.htmlSelectors.roomNumber.setCustomValidity('Не для гостей');
    } else {
      window.htmlSelectors.roomNumber.setCustomValidity('');
    }
  };

  window.htmlSelectors.roomNumber.addEventListener('change', function (evt) {
    evt.preventDefault();

    setRoomsToGuests();
  });

  window.htmlSelectors.roomCapacity.addEventListener('change', function (evt) {
    evt.preventDefault();

    setRoomsToGuests();
  });

  var setTime = function (firstArgument, secondArgument) {
    if (firstArgument.value !== secondArgument.value) {
      firstArgument.value = secondArgument.value;
    }
  };

  window.htmlSelectors.timeIn.addEventListener('change', function (evt) {
    evt.preventDefault();
    setTime(window.htmlSelectors.timeOut, window.htmlSelectors.timeIn);
  });

  window.htmlSelectors.timeOut.addEventListener('change', function (evt) {
    evt.preventDefault();
    setTime(window.htmlSelectors.timeIn, window.htmlSelectors.timeOut);
  });

  // кастомные сообщения валидации
  var checkAdFormTitleValidity = function () {
    var validityStateObject = window.htmlSelectors.adFormTitle.validity;
    if (validityStateObject.valueMissing) {
      window.htmlSelectors.adFormTitle.setCustomValidity('Пожалуйста заполните это поле!');
    } else if (validityStateObject.tooShort) {
      window.htmlSelectors.adFormTitle.setCustomValidity('Описание должно быть не менее 30 символов');
    } else {
      window.htmlSelectors.adFormTitle.setCustomValidity('');
    }
  };

  var checkAdFormPriceValidity = function () {
    var validityStateObject = window.htmlSelectors.adFormPrice.validity;
    if (validityStateObject.valueMissing) {
      window.htmlSelectors.adFormPrice.setCustomValidity('Пожалуйста заполните это поле!');
    } else if (validityStateObject.rangeUnderflow) {
      window.htmlSelectors.adFormPrice.setCustomValidity('Стомость должна быть больше ' + window.htmlSelectors.adFormPrice.min + ' руб');
    } else if (validityStateObject.rangeOverflow) {
      window.htmlSelectors.adFormPrice.setCustomValidity('Стомость должна быть меньше ' + window.htmlSelectors.adFormPrice.max + ' руб');
    } else {
      window.htmlSelectors.adFormPrice.setCustomValidity('');
    }
  };

  window.htmlSelectors.adFormPrice.addEventListener('invalid', function () {
    checkAdFormPriceValidity();
  });

  window.htmlSelectors.adFormTitle.addEventListener('invalid', function () {
    checkAdFormTitleValidity();
  });

  window.htmlSelectors.adFormSubmit.addEventListener('click', function () {
    setRoomsToGuests();
  });
})();
