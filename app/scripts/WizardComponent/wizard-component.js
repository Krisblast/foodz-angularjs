angular.module('foodzApp')
  .component('wizard', {
    templateUrl: 'scripts/WizardComponent/wizard-component.html',
    controller: function () {
      var $ctrl = this;
    },
    bindings: {
      step: '<',
      count: '<'
    }
  });
