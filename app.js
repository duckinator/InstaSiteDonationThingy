'use strict';

// FIXME: Get rid of the endless copypasta! I'm not even going near THAT rabbit hole right now.
//        The only differences between the controllers is the config key.
//        The only differences between the directives are the template and controller names.

var instaSiteDonationThingy = angular.module('instaSiteDonationThingy', []);

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

  /* ================================ PayPal ================================ */
  .controller('PaypalWidgetCtrl', ['$scope', 'donationConfig',
    function ($scope, donationConfig) {
      donationConfig(function (config) {
        angular.extend($scope, config['paypal']);
      });
    }])

  // PayPal one-off donations widget.
  .directive('paypalWidget',
    function () {
      return {
        templateUrl: 'templates/paypal.html',
        scope: {},
        controller: 'PaypalWidgetCtrl'
      };
    })

  // PayPal recurring donations widget.
  .directive('paypalRecurringWidget',
    function () {
      return {
        templateUrl: 'templates/paypal-recurring.html',
        scope: {},
        controller: 'PaypalWidgetCtrl'
      };
    })

  /* ================================ Venmo  ================================ */
  .controller('VenmoWidgetCtrl', ['$scope', 'donationConfig',
    function ($scope, donationConfig) {
      donationConfig(function (config) {
        angular.extend($scope, config['venmo']);
      });
    }])

  // Venmo one-off donations widget.
  .directive('venmoWidget',
    function () {
      return {
        templateUrl: 'templates/venmo.html',
        scope: {},
        controller: 'VenmoWidgetCtrl'
      };
    })

  /* ================================ Dwolla ================================ */
  .controller('DwollaWidgetCtrl', ['$scope', 'donationConfig',
    function ($scope, donationConfig) {
      donationConfig(function (config) {
        angular.extend($scope, config['dwolla']);
      });
    }])

  .directive('dwollaWidget',
    function () {
      return {
        templateUrl: 'templates/dwolla.html',
        scope: {},
        controller: 'DwollaWidgetCtrl'
      };
    })

  /* ============================== MoonClerk  ============================== */
  .controller('MoonClerkWidgetCtrl', ['$scope', 'donationConfig',
    function ($scope, donationConfig) {
      donationConfig(function (config) {
        angular.extend($scope, config['moonclerk']);
      });
    }])

  .directive('moonclerkWidget',
    function () {
      return {
        templateUrl: 'templates/moonclerk.html',
        scope: {},
        controller: 'MoonClerkWidgetCtrl'
      };
    })

  /* =========================== Amazon Payments  =========================== */
  .controller('AmazonPaymentsWidgetCtrl', ['$scope', 'donationConfig',
    function ($scope, donationConfig) {
      donationConfig(function (config) {
        angular.extend($scope, config['amazon-payments']);
      });
    }])

  .directive('amazonPaymentsWidget',
    function () {
      return {
        templateUrl: 'templates/amazon-payments.html',
        scope: {},
        controller: 'AmazonPaymentsWidgetCtrl'
      };
    })

  /* ============================ Google Wallet  ============================ */
  .controller('GoogleWalletWidgetCtrl', ['$scope', 'donationConfig',
    function ($scope, donationConfig) {
      donationConfig(function (config) {
        angular.extend($scope, config['google-wallet']);
      });
    }])

  .directive('googleWalletWidget',
    function () {
      return {
        templateUrl: 'templates/google-wallet.html',
        scope: {},
        controller: 'GoogleWalletWidgetCtrl'
      };
    })

  /* =============================== Patreon  =============================== */
  .controller('PatreonWidgetCtrl', ['$scope', 'donationConfig',
    function ($scope, donationConfig) {
      donationConfig(function (config) {
        angular.extend($scope, config['patreon']);
      });
    }])

  .directive('patreonWidget',
    function () {
      return {
        templateUrl: 'templates/patreon.html',
        scope: {},
        controller: 'PatreonWidgetCtrl'
      };
    })
  ;
