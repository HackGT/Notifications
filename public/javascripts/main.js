var app = angular.module('notif', []);

app.controller('AppController', ['$scope', "$http", function($scope, $http) {
  $scope.fetch = function() {
      $http.get('/notifications',
      function(res) {
          $scope.greeting = res;
      },
      function(err) {
          console.error(err);
      }
    );
    }

}]);
