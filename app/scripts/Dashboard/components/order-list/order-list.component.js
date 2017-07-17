angular.module('foodzApp')
  .component('orderList', {
    templateUrl: 'scripts/Dashboard/components/order-list/order-list.template.html',
    controller: function(){
      var $ctrl = this;
    },
    bindings: {
      orders: '<',
      loading: '<',
      limit: '<'
    }
  });
