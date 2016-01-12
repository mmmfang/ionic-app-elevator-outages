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
  $stateProvider.state('add', {
    url:'/add',
    templateUrl: 'templates/edit.html',
    controller: 'AddCtrl'
  });
//using same template for ADD and EDIT functions, 
//so that's why we set controller here

  $urlRouterProvider.otherwise('/home');
});



app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


//TURN TO SERVICE??!!??
app.controller('OutageCtrl', function($scope, XmlConverter) {
     
    //This is the callback function
    outageData = function(data) {
        //console.log("outageData", data.NYCOutages.outage); //array of 40 objects
        $scope.outages = data.NYCOutages.outage;
    };

    XmlConverter.get(outageData);
});

app.controller('HomeCtrl', function($scope) {
     
$scope.home = "home";

});


app.controller('AddCtrl', function($scope) {
     
$scope.add = "add";

});

///PLANNING
//SEARCHCTRL?? by borough, train line, station(search)
//put the search stuff in a factory?
//return{boroSearch: function(clickedonboro) {}, trainLineSearch: function(){}, typeSearch(){}}
//put custom filters in a directive
// app.factory('properName': function(char) {},) FOR THOSE EL ESC, BOROUGH SEARCH

// app.controller('SpecificOutagesCtrl', function($scope, XmlConverter) {

//     //This is the callback function
//     outageData = function(data) {
//         //console.log("outageData", data.NYCOutages.outage); //array of 40 objects
//         $scope.outages = data.NYCOutages.outage;
//     };

//     XmlConverter.get(outageData);

// }



})(); //IIFE