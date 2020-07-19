'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('#images');
  var preview = document.querySelector('.ad-form__photo');

  preview.innerHTML = '<img width=70 height=70>';
  var previewPhoto = document.querySelector('.ad-form__photo img');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewPhoto.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
