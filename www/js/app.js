(function(){
var app = angular.module('mtaApp', ['ionic', 'mtaApp.XmlConverter']);

//Routing using Angular UI Router
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

app.controller('HomeCtrl', function($scope, XmlConverter){
  $scope.home = "home";
    var outageData = function(data) {
    //console.log("outageData", data.NYCOutages.outage); //array of 40 objects
    $scope.outages = data.NYCOutages.outage;
  };
    XmlConverter.get(outageData);
});

app.controller('BoroCtrl', function($scope, XmlConverter){
  var outageData = function(data) {
    $scope.outages = data.NYCOutages.outage;
  };
    XmlConverter.get(outageData);
});


app.controller('TrainlineCtrl', function($scope, XmlConverter) {
  var outageData=function(data) {
    $scope.outages = data.NYCOutages.outage[1];
    //console.log($scope.outages);

    this.getTrainLines = function(trainno, callback){
     var inputtedTrain=trainno;
     console.log(inputtedTrain);
    }

//code from MEAN stack app

  // var controller=this;

  // //TO GET OUTAGES BY TRAIN LINE - USING THE XML DATA
  // this.getTrainLines = function(trainno, callback){
  //   var inputtedTrain=trainno;

  //   var promise = $http.get('/feed');
  //   promise.success(function(data){
  //     controller.allData = data;

  //   $(data).find("outage").each(function(){
  //     var singleOutage = this;
  //     var trainLines= $(singleOutage).find("trainno").text(); 

  //      if (trainLines.length >= 1) {
  //         var trainArray=trainLines.split("/");
  //         for (var i=0; i<trainArray.length; i++) {
  //           //console.log('tl split for this el', i ,trainArray[i]);
  //           console.log('fulltrainarray', trainLines);
  //         }

  //         var checkEquip = $(singleOutage).find("equipment").text();
  //         var whichEquipment = elOrEsc(checkEquip);

  //         var findBoro = $(singleOutage).find("borough").text();
  //         var whichBoro =  filterBoro(findBoro);

  //        if (trainLines.includes(inputtedTrain)) {

  //         $('#box').append('<div id="info-box"><div class="station"><li>' + 
  //         $(singleOutage).find("station").text() +
          
  //         '</div><table class="table-condensed"><tr><td>Current Outage: </td><td><strong>' 
  //         + whichEquipment + ' at ' + 
  //         $(singleOutage).find("serving").text().toLowerCase() + 

  //         '</td></tr><tr><td>Scheduled Return to Service: </td><td>' + 
  //         $(singleOutage).find("estimatedreturntoservice").text() + 

  //         '</strong></td></tr><tr><td>Station Info: </td><td>'
  //         + whichBoro + '; ' + 
  //         $(singleOutage).find("trainno").text() +

  //         '</td></tr><tr><td>Reason for Outage: </td><td>' + 
  //         $(singleOutage).find("reason").text().toLowerCase() + 
          
  //         '</td></tr><tr><td>Outage began: </td><td>' + 
  //         $(singleOutage).find("outagedate").text() +
  //         '</td></tr></table></div>');

  //       } else {
  //         //console.log('not displaying since not correct trainline')
  //       };
       
  //     } else {
  //       console.log('possible err,single trainline is', trainLines)
  //     };

  //     });
  //   })//end of data.find
  // }; this.getTrainLines();/

//end code from MEAN stack app



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