(function(){
var app=angular.module('mtaApp', ['ionic', 'mtaApp.XmlConverter']);

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


//http://www.clearlyinnovative.com/working-xml2json-strings-ionic-framework-project
//http://rabidgadfly.com/2013/02/angular-and-xml-no-problem/
 
app.controller('OutageCtrl', function($scope, xmlconverter) {
     
    //This is the callback function
    outageData = function(data) {
        console.log("outageData", data.NYCOutages.outage);
        $scope.dataSet = data.NYCOutages.outage; //array of 40 objects
    }
         
    xmlconverter.get(outageData);
  });   


}()); //IIFE