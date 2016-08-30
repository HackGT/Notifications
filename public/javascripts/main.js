var app = angular.module('notif', []);

app.controller('AppController', function($scope, $http, $timeout) {
  var getNotifications = function() {
    $http.get('/api/notifications', {})
      .then(
        function(res) {
          $scope.notifs = res.data;
        },
        function(err) {
          console.error(err);
        }
      );
      $timeout(function(){
        getNotifications();
      },5000);
  };
  getNotifications();
});

app.controller('ConsoleController', ['$scope', function($scope) {
  $scope.title =  "Notifications Console";
}]);
