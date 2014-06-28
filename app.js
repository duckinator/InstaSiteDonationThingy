'use strict';

// To make all of the 
function template(id) {
  return document.getElementById(id + "-template").innerHTML;
}

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

  .factory('venmoDetails', ['$http',
    function ($http) {
      // FIXME: Venmo's documentation says that an access token is required,
      //        but it doesn't *appear* to be required right now.
      //        Odds are, this will begin to fail at some point.
      //        I've reached out to them on Twitter (https://twitter.com/duckinator/status/482046490060529664)
      //        in hopes of them adding a way to embed a Venmo button
      //        based directly on username (instead of doing a lookup).
      function venmoDetails(username, callback) {
        return $http.get('https://api.venmo.com/v1/users/' + username).success(callback);
      }

      return venmoDetails;
    }])


  /* ================================ PayPal ================================ */
  .controller('PayPalWidgetCtrl', ['$scope', 'donationConfig',
    function ($scope, donationConfig) {
      donationConfig(function (config) {
        $scope.email = config.paypal.email;
      });
    }])

  // PayPal one-off donations widget.
  .directive('paypalWidget',
    function () {
      return {
        template: template('paypal'),
        controller: 'PayPalWidgetCtrl'
      };
    })

  // PayPal recurring donations widget.
  .directive('paypalRecurringWidget',
    function () {
      return {
        template: template('paypal-recurring'),
        controller: 'PayPalWidgetCtrl'
      };
    })

  /* ================================ Venmo  ================================ */
  .controller('VenmoWidgetCtrl', ['$scope', 'donationConfig',
    function ($scope, donationConfig) {
      donationConfig(function (config) {
        $scope.default = config.venmo.default;

        $scope.username = config.venmo.username;
      });
    }])

    .directive('venmoWidget',
      function () {
        return {
          template: template('venmo'),
          controller: 'VenmoWidgetCtrl'
        };
      })
  ;
