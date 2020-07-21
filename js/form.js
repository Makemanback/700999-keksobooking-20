'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormElements = document.querySelectorAll('.ad-form__element');
  var adFormSubmit = document.querySelector('.ad-form__submit');
  var adFormTitle = document.querySelector('#title');
  var adFormType = document.querySelector('#type');
  var adFormPrice = document.querySelector('#price');
  var adFormReset = document.querySelector('.ad-form__reset');
  var roomNumber = document.querySelector('#room_number');
  var roomCapacity = document.querySelector('#capacity');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var MinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var disableFormElements = function () {
    adFormElements.forEach(function (item) {
      item.setAttribute('disabled', true);
    });
  };
  disableFormElements();

  var adFormHeader = document.querySelector('.ad-form-header');
  adFormHeader.setAttribute('disabled', true);

  window.utils.setAddressValue();

  adFormTitle.setAttribute('required', true);
  adFormPrice.setAttribute('required', true);

  var setMinValue = function () {
    switch (adFormType.value) {
      case ('bungalo'):
        adFormPrice.setAttribute('min', MinPrice.bungalo);
        adFormPrice.setAttribute('placeholder', MinPrice.bungalo);
        break;
      case ('flat'):
        adFormPrice.setAttribute('min', MinPrice.flat);
        adFormPrice.setAttribute('placeholder', MinPrice.flat);
        break;
      case ('house'):
        adFormPrice.setAttribute('min', MinPrice.house);
        adFormPrice.setAttribute('placeholder', MinPrice.house);
        break;
      case ('palace'):
        adFormPrice.setAttribute('min', MinPrice.palace);
        adFormPrice.setAttribute('placeholder', MinPrice.palace);
        break;
    }
  };

  adFormType.addEventListener('change', function (evt) {
    evt.preventDefault();
    setMinValue();
  });

  var setRoomsToGuests = function () {
    if (roomNumber.value === '1' && (roomCapacity.value > roomNumber.value || roomCapacity.value === '0')) {
      roomNumber.setCustomValidity('Для 1 гостя');
    } else if (roomNumber.value === '2' && (roomCapacity.value > roomNumber.value || roomCapacity.value === '0')) {
      roomNumber.setCustomValidity('Для 2 гостей или для 1 гостя');
    } else if (roomNumber.value === '3' && roomCapacity.value === '0') {
      roomNumber.setCustomValidity('Для 3 гостей, для 2 гостей или для 1 гостя');
    } else if (roomNumber.value === '100') {
      roomNumber.setCustomValidity('Не для гостей');
    } else {
      roomNumber.setCustomValidity('');
    }
  };

  roomNumber.addEventListener('change', function (evt) {
    evt.preventDefault();

    setRoomsToGuests();
  });

  roomCapacity.addEventListener('change', function (evt) {
    evt.preventDefault();

    setRoomsToGuests();
  });

  var setTime = function (firstArgument, secondArgument) {
    if (firstArgument.value !== secondArgument.value) {
      firstArgument.value = secondArgument.value;
    }
  };

  timeIn.addEventListener('change', function (evt) {
    evt.preventDefault();
    setTime(timeOut, timeIn);
  });

  timeOut.addEventListener('change', function (evt) {
    evt.preventDefault();
    setTime(timeIn, timeOut);
  });

  var checkAdFormTitleValidity = function () {
    var validityStateObject = adFormTitle.validity;
    if (validityStateObject.valueMissing) {
      adFormTitle.setCustomValidity('Пожалуйста заполните это поле!');
    } else if (validityStateObject.tooShort) {
      adFormTitle.setCustomValidity('Описание должно быть не менее 30 символов');
    } else {
      adFormTitle.setCustomValidity('');
    }
  };

  var checkAdFormPriceValidity = function () {
    var validityStateObject = adFormPrice.validity;
    if (validityStateObject.valueMissing) {
      adFormPrice.setCustomValidity('Пожалуйста заполните это поле!');
    } else if (validityStateObject.rangeUnderflow) {
      adFormPrice.setCustomValidity('Стомость должна быть больше ' + adFormPrice.min + ' руб');
    } else if (validityStateObject.rangeOverflow) {
      adFormPrice.setCustomValidity('Стомость должна быть меньше ' + adFormPrice.max + ' руб');
    } else {
      adFormPrice.setCustomValidity('');
    }
  };

  adFormPrice.addEventListener('invalid', function () {
    checkAdFormPriceValidity();
  });

  adFormTitle.addEventListener('invalid', function () {
    checkAdFormTitleValidity();
  });

  adFormSubmit.addEventListener('click', function () {
    setRoomsToGuests();
  });

  var resetForm = function (evt) {
    evt.preventDefault();
    window.utils.disablePage();
    adForm.reset();
    window.utils.setAddressValue();
  };

  adFormReset.addEventListener('click', resetForm);


  var onSubmit = function (evt) {
    window.backend.save(new FormData(adForm), window.utils.disablePage);
    evt.preventDefault();
  };
  adForm.addEventListener('submit', onSubmit);

  window.form = {
    adFormElements: adFormElements,
    disableFormElements: disableFormElements,
    adFormHeader: adFormHeader
  };
})();
