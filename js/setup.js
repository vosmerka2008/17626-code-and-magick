'use strict';

(function () {
  var WIZARDS_COUNT = 4;
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  window.setup = {
    getRandomValue: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    WIZARD_COATS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    WIZARD_EYES: ['black', 'red', 'blue', 'yellow', 'green']
  };

  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderFragment = function (newWizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      fragment.appendChild(renderWizard(newWizards[i]));
    }

    return fragment;
  };

  var successHandler = function (serverWizards) {
    similarListElement.appendChild(renderFragment(serverWizards));
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: white; border: 2px dashed red; color: red; text-transform: uppercase;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.textShadow = '3px 3px 2px lightgrey';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  var form = userDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      userDialog.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });

  //  перетаскивание
  var shopElement = document.querySelector('.setup-artifacts-shop'); // магазин
  var draggedItem = null; // элемент, который перетаскиваем
  var draggedItemCopy = null;
  var artifactsElement = document.querySelector('.setup-artifacts'); // рюкзак

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
