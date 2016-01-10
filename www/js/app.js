// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('mtaApp', ['ionic'])

.run(function($ionicPlatform) {
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
})

// .controller('OutageCtrl', ['$http', '$scope', function($http, $scope){

//  var ctrl=this;

//     $.get('/feed', function(xml){

//       // Create x2js instance with default config
//       var x2js = new X2JS();
//       var xmlText = "<MyRoot><test>Success</test><test2><item>val1</item><item>val2</item></test2></MyRoot>";
//       var jsonObj = x2js.xml_str2json( xmlText );

//         var json = $.xml2json(xml); //json will get all the json
//         ctrl.outage = json.outage; //gets outages as objects in an array
//     });
//    };

// }])


//angular.module('mtaAppService',[])
    .factory('DataSource', ['$http',function($http){
       return {
           get: function(callback){
                $http.get('/feed', {transformResponse:function(data) {
                      // convert the data to JSON and provide
                      // it to the success function below
                        var x2js = new X2JS();
                        var json = x2js.xml_str2json( data );
                        return json;
                        }
                    }
                ).
                success(function(data, status) {
                    // send the converted data back
                    // to the callback function
                    callback(data);
                })
           }
       }
    }])

//http://www.clearlyinnovative.com/working-xml2json-strings-ionic-framework-project

 
.controller('AppController', function($scope,DataSource) {
     
    //This is the callback function
    setData = function(data) {
        console.log("setdata", data.NYCOutages.outage);
        $scope.dataSet = data.NYCOutages.outage; //array of 40 objects
    }
         
    DataSource.get(setData);
  });   

// var AppController = function($scope,DataSource) {

//   var SOURCE_FILE = "timer.xml";

//   xmlTransform = function(data) {
//     console.log("transform data");
//     var x2js = new X2JS();
//     var json = x2js.xml_str2json(data);
//     return json.TimerStatus;
//   };

//   setData = function(data) {
//     console.log("setdata", data);
//     $scope.dataSet = data;
//   };

//   DataSource.get(SOURCE_FILE,setData,xmlTransform);
// };
