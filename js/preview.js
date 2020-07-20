'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('#avatar');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  var fileChooserAccomodation = document.querySelector('#images');
  var previewAccomodation = document.querySelector('.ad-form__photo');

  previewAccomodation.innerHTML = '<img>';
  var previewPhoto = document.querySelector('.ad-form__photo img');
  previewPhoto.style = 'border-radius: 5px; width: 70px; height: 70px';

  var uploadImage = function (item, photo) {
    item.addEventListener('change', function () {
      var file = item.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          photo.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };

  uploadImage(fileChooserAvatar, previewAvatar);
  uploadImage(fileChooserAccomodation, previewPhoto);
})();
