'use strict';

(function () {
  var setupOpen = document.querySelector('.setup-open');
  var setup = document.querySelector('.setup');
  var setupPlayer = setup.querySelector('.setup-player');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');
  var setupWizardCoat = setupPlayer.querySelector('.wizard-coat');
  var setupWizardEyes = setupPlayer.querySelector('.wizard-eyes');
  var setupFireball = setupPlayer.querySelector('.setup-fireball-wrap');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  document.body.addEventListener('keydown', function (evt) {
    if (evt.target === userNameInput) {
      event.stopPropagation();
    } else {
      window.util.isEscEvent(evt, closePopup);
    }
  });

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Придумайте имя хотя бы из 2-х символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Нужно обязательно заполнить');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  setupWizardCoat.addEventListener ('click', function() {
    window.setup.changeCoatColor();
  });

  setupWizardEyes.addEventListener ('click', function() {
    window.setup.changeEyesColor();
  });

  setupFireball.addEventListener ('click', function() {
    window.setup.changeFireballColor();
  });
})();
