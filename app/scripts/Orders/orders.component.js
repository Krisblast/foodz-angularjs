angular.module('foodzApp')
  .component('ordersMain', {
    templateUrl: 'scripts/Orders/orders.template.html',
    controller: function(orderService){
      var $ctrl = this;
      function getOrders() {
        $ctrl.loading = true;
        orderService.getOrders().then(function (resp) {
          $ctrl.loading = false;
          $ctrl.orders = resp.data;
        }, function (errorResp) {
        })
      }
      getOrders()
    },
    bindings: {
    }
  });

