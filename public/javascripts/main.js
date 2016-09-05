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

app.controller('ConsoleController', function($scope, $http) {
  $scope.notif = {
    type: "GENERAL"
  }

  $scope.submit = function() {
    console.log($scope.notif);
    $http.post('/api/notifications', $scope.notif)
      .then(
        function(res) {
          alert('Notification has been sent to the people!');
          $scope.notif = {};
        },
        function(err) {
          console.error('Error, check console');
        }
      );
  };
});

app.controller('LoginController', function($scope, $http, $window) {
  $scope.submit = function() {
      $http.post('/api/login', $scope.user)
        .then(
          function(res) {
            console.log('Successful login');
            $window.location.href = '/';
          },
          function(err) {
            console.error(err);
          }
        );
  };
});
