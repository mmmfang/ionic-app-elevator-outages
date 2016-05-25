(function(){
var app = angular.module('mtaApp', ['ionic', 'mtaApp.XmlConverter', 'mtaApp.Filters']);

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
  $urlRouterProvider.otherwise('/home');
});


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // stops the viewport from snapping when text inputs are focused. 
      // Ionic handles this internally for a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


app.controller('OutageCtrl', function($scope, XmlConverter, Filters) {
    
    //This is the callback function
    outageData = function(data) {
        //console.log("outageData", data.NYCOutages.outage); //array of 40 objects
        $scope.outages = data.NYCOutages.outage;
    };

    XmlConverter.get(outageData);
});

app.controller('HomeCtrl', function($scope, Filters) {
     
$scope.home = "home";

});


app.controller('BoroCtrl', function($scope) {
     
$scope.add = "add";

});

///PLANNING
//SEARCHCTRL?? by borough, train line, station(search)
//put the search stuff in a factory?
//return{boroSearch: function(clickedonboro) {}, trainLineSearch: function(){}, typeSearch(){}}
//put custom filters in a directive
// app.factory('properName': function(char) {},) FOR THOSE EL ESC, BOROUGH SEARCH

app.controller('SpecificOutagesCtrl', function($scope, XmlConverter) {

//     //This is the callback function
//     outageData = function(data) {
//         //console.log("outageData", data.NYCOutages.outage); //array of 40 objects
//         $scope.outages = data.NYCOutages.outage;
//     };

//     XmlConverter.get(outageData);

});



}()); //IIFE