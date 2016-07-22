(function(){
var app = angular.module('mtaApp', ['ionic', 'mtaApp.XmlConverter']);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state('list', {
    url:'/list',
    templateUrl: 'templates/list.html',
    controller: 'OutageCtrl'
  });
  $stateProvider.state('home', {
    url:'/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  });
  $stateProvider.state('borough', {
    url:'/borough',
    templateUrl: 'templates/borough.html',
    controller: 'BoroCtrl'
  });
  $stateProvider.state('trainline', {
    url:'/trainline',
    templateUrl: 'templates/trainline.html',
    controller: 'TrainlineCtrl'
  });
  $stateProvider.state('station', {
    url:'/station',
    templateUrl: 'templates/station.html',
    controller: 'StationCtrl'
  });
  $urlRouterProvider.otherwise('/home');
});

app.controller('OutageCtrl', function($scope, XmlConverter){
  var outageData = function(data) {
    //console.log("outageData", data.NYCOutages.outage); //array of 40 objects
    $scope.outages = data.NYCOutages.outage;
  };
    XmlConverter.get(outageData);
});

app.controller('HomeCtrl', function($scope){
  $scope.home = "home";
});

app.controller('BoroCtrl', function($scope, XmlConverter){
  var outageData = function(data) {
    $scope.outages = data.NYCOutages.outage;
  };
    XmlConverter.get(outageData);
});


app.controller('TrainlineCtrl', function($scope, XmlConverter) {
  var outageData=function(data) {
    $scope.outages = data.NYCOutages.outage;
  };
    XmlConverter.get(outageData);
});

app.controller('StationCtrl', function($scope, XmlConverter) {
  outageData = function(data) {
    $scope.outages = data.NYCOutages.outage;
  };
    XmlConverter.get(outageData);
});


//ANGULAR CUSTOM FILTERS

//To display whether elevator or escalator is broken
app.filter('equipmentFilter', function() {
   return function(word) {
   var charZero = word.charAt(0);
   var charOne = word.charAt(1);
        if (charZero=='E' && charOne=='L') {
          return "Elevator";
        } else {
          return "Escalator";
        }
     };
});

//To display full borough name from abbreviation provided
app.filter('boroFilter', function() {
   return function(word) {
   var charZero = word.charAt(0);
   var charOne = word.charAt(1);
      if (charZero=='M' && charOne=='N') {
        return "Manhattan";
      } else if (charZero=='Q' && charOne=='N') {
        return "Queens";
      } else if (charZero=='B' && charOne=='K') {
        return "Brooklyn";
      } else if (charZero=='B' && charOne=='X') {
        return "Bronx";
      } else {
        return "N/A";
      }
   };
});

//CUSTOM DIRECTIVE
app.directive('outageListing', function(){
  return {
    template: '<ng-include src="getTemplateUrl()" />',
    controller: function ($scope) {
      $scope.getTemplateUrl = function(){
        return "../templates/outage.html";
      };
    }
  };
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


}()); //IIFE