(function() {
  'use strict';

  /**
   * {Factory} paramsSrv
   * @fileOverview Retrieve the params
   */
  angular
    .module('ci_params', ['ci_utils'])
    .factory('paramsSrv', [
      '$cookies',
      '$location',
      'utilsSrv',
      function($cookies, $location, utilsSrv) {
        var self = {};

        init();
        /**
         * @name init
         * @description Sets up the params
         */
        function init() {
          _.each(utilsSrv.location().queryString(), function(value, key) {
            self[key.toUpperCase()] = value.toString();
          });

          _.each($cookies, function(value, key) {
            if (value != 'undefined' && key != 'CLC') {
              self[key] = self[key] || value;
            }
          });

          self.hideParams = function() {
            angular.forEach($location.search(), function (value, key) {
              $location.search(key, null);
            });
          };

        }

        return self;
      }
    ]);
})();
