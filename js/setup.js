'use strict';

//  var userDialog = document.querySelector('.setup');
//  userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита',
  'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var setupPlayer = setup.querySelector('.setup-player');
var setupWizardCoat = setupPlayer.querySelector('.wizard-coat');
var setupWizardEyes = setupPlayer.querySelector('.wizard-eyes');
var setupFireball = setupPlayer.querySelector('.setup-fireball-wrap');
var userNameInput = setup.querySelector('.setup-user-name');

var getRandomIndex = function (arrLength) {
  var rand = Math.floor(Math.random() * arrLength);

  return rand;
};

var getNewWizard = function () {
  var wizard = {
    name: WIZARD_NAMES[getRandomIndex(WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[getRandomIndex(WIZARD_SURNAMES.length)],
    coatColor: WIZARD_COATS[getRandomIndex(WIZARD_COATS.length)],
    eyesColor: WIZARD_EYES[getRandomIndex(WIZARD_EYES.length)]
  };

  return wizard;
};

var getWizardsArray = function (wizardsCount) {
  var wizards = [];
  for (var i = 0; i < wizardsCount; i++) {
    wizards.push(getNewWizard());
  }

  return wizards;
};

var wizards = getWizardsArray(WIZARDS_COUNT);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  return fragment;
};

similarListElement.appendChild(renderFragment());

//  события

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
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
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

document.body.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target === userNameInput) {
    event.stopPropagation();
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
  setupWizardCoat.addEventListener('click', function () {
    setupWizardCoat.style.fill = WIZARD_COATS[getRandomIndex(WIZARD_COATS.length)];
  });
};

var changeEyesColor = function () {
  setupWizardEyes.addEventListener('click', function () {
    setupWizardEyes.style.fill = WIZARD_EYES[getRandomIndex(WIZARD_EYES.length)];
  });
};

var changeFireballColor = function () {
  setupFireball.addEventListener('click', function () {
    setupFireball.style.background = FIREBALL_COLORS[getRandomIndex(FIREBALL_COLORS.length)];
  });
};

changeCoatColor();
changeEyesColor();
changeFireballColor();
