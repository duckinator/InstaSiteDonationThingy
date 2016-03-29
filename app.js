'use strict';

var instaSiteDonationThingy = angular.module('instaSiteDonationThingy', []);

// The controllers and directives are all identical aside from the service name
// and which variant of the widget to use, so there are two helper functions
// used when generating them.

var widgetController = function (serviceName) {
  return ['$scope', 'donationConfig',
    function ($scope, donationConfig) {
      donationConfig(function (config) {
        angular.extend($scope, config[serviceName]);
      });
    }
  ];
};

var widgetDirective = function (serviceName, variant) {
  // foo-bar-baz => FooBarBaz.
  var controllerPart =
    serviceName.replace(/(^|-)./g, function (x) {
      if (x[0] == '-') {
        x = x.slice(1);
      }

      return x.toUpperCase();
    });

  // If we pass a variant, we want templates/variant/template-url-part.html.
  // If we don't, we want templates/template-url-part.html.
  var variantPart = variant ? '/' + variant + '/' : '';

  return (function () {
    return {
      templateUrl: 'templates/' + variantPart + serviceName + '.html',
      scope: {},
      controller: controllerPart + 'WidgetCtrl'
    };
  });
}

instaSiteDonationThingy
  /*
   * Usage:
   *    donationConfig(function (config) {
   *      // ...
   *    });
   */
  .factory('donationConfig', ['$http',
    function ($http) {
      return $http.get('config.json').success;
    }])

  // PayPal
  .controller('PaypalWidgetCtrl',         widgetController('paypal'))
  .directive('paypalWidget',              widgetDirective('paypal'))
  .directive('paypalRecurringWidget',     widgetDirective('paypal', 'recurring'))

  // Venmo
  .controller('VenmoWidgetCtrl',          widgetController('venmo'))
  .directive('venmoWidget',               widgetDirective('venmo'))

  // Dwolla
  .controller('DwollaWidgetCtrl',         widgetController('dwolla'))
  .directive('dwollaWidget',              widgetDirective('dwolla'))

  // MoonClerk
  .controller('MoonclerkWidgetCtrl',      widgetController('moonclerk'))
  .directive('moonclerkRecurringWidget',  widgetDirective('moonclerk', 'recurring'))

  // Amazon Payments
  .controller('AmazonPaymentsWidgetCtrl',     widgetController('amazon-payments'))
  .directive('amazonPaymentsRecurringWidget', widgetDirective('amazon-payments', 'recurring'))

  // Google Wallet
  .controller('GoogleWalletWidgetCtrl',       widgetController('google-wallet'))
  .directive('googleWalletRecurringWidget',   widgetDirective('google-wallet', 'recurring'))

  // Patreon
  .controller('PatreonWidgetCtrl',        widgetController('patreon'))
  .directive('patreonWidget',             widgetDirective('patreon', 'recurring'))

  ;
