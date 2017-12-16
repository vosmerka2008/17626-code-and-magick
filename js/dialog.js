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

  setupOpen.addEventListener('click', openPopup);

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', closePopup);

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

  var changeCoatColor = function () {
    window.colorizeElement(setupWizardCoat, window.setup.WIZARD_COATS, fillElement);
  };

  var changeEyesColor = function () {
    window.colorizeElement(setupWizardEyes, window.setup.WIZARD_EYES, fillElement);
  };

  var changeFireballColor = function () {
    var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
    window.colorizeElement(setupFireball, FIREBALL_COLORS, changeElementBackground);
  };

  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var changeElementBackground = function (element, color) {
    element.style.background = color;
  };

  setupWizardCoat.addEventListener('click', changeCoatColor);

  setupWizardEyes.addEventListener('click', changeEyesColor);

  setupFireball.addEventListener('click', changeFireballColor);

  //  перетаскивание
  var dialogHandle = setup.querySelector('.setup-user-pic');

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (moveEvt.clientY < 0 || moveEvt.clientY > window.innerHeight) {
        setup.style.top = 0 + 'px';
      } else {
        setup.style.top = (setup.offsetTop - shift.y) + 'px';
        setup.style.left = (setup.offsetLeft - shift.x) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
