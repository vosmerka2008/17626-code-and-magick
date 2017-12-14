'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита',
    'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_COUNT = 4;
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setup = document.querySelector('.setup');
  var setupPlayer = setup.querySelector('.setup-player');
  var setupWizardCoat = setupPlayer.querySelector('.wizard-coat');
  var setupWizardEyes = setupPlayer.querySelector('.wizard-eyes');
  var setupFireball = setupPlayer.querySelector('.setup-fireball-wrap');

  document.querySelector('.setup-similar').classList.remove('hidden');

  window.setup = {
    getRandomIndex: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    getRandomValue: function (arrLength) {
      return Math.floor(Math.random() * arrLength);
    }
  };

  var getNewWizard = function () {
    return {
      name: WIZARD_NAMES[window.setup.getRandomValue(WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[window.setup.getRandomValue(WIZARD_SURNAMES.length)],
      coatColor: WIZARD_COATS[window.setup.getRandomValue(WIZARD_COATS.length)],
      eyesColor: WIZARD_EYES[window.setup.getRandomValue(WIZARD_EYES.length)]
    };
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

 //  перетаскивание
  var shopElement = document.querySelector('.setup-artifacts-shop'); // магазин
  var draggedItem = null; // элемент, который перетаскиваем
  var draggedItemCopy = null;
  var artifactsElement = document.querySelector('.setup-artifacts'); // рюкзак
  var artifactsElementCell = artifactsElement.querySelector('.setup-artifacts-cell');

  //  начало перетаскивания: что перетаскиваем
  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      draggedItemCopy = draggedItem.cloneNode(true);
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

   artifactsElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItemCopy = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  //  отменить запрет браузера на перетаскивание
  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  //  бросить элемент в цель
  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.style.outline = '';
    if (draggedItemCopy !== evt.target) {
      evt.target.appendChild(draggedItemCopy);
    }
    evt.preventDefault();
  });

  //  элемент над целью
  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.target.style.outline = '2px dashed red';
    evt.preventDefault();
  });

  // мимо цели
  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.style.outline = '';
    evt.preventDefault();
  });
})();
