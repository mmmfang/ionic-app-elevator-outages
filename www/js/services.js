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
    }]);

//http://www.clearlyinnovative.com/working-xml2json-strings-ionic-framework-project
//http://rabidgadfly.com/2013/02/angular-and-xml-no-problem/
 
var AppController = function($scope,DataSource) {
     
    //This is the callback function
    setData = function(data) {
        $scope.dataSet = data;
    }
         
    DataSource.get(setData);
     

var AppController = function($scope,DataSource) {

  var SOURCE_FILE = "timer.xml";

  xmlTransform = function(data) {
    console.log("transform data");
    var x2js = new X2JS();
    var json = x2js.xml_str2json(data);
    return json.TimerStatus;
  };

  setData = function(data) {
    console.log("setdata", data);
    $scope.dataSet = data;
  };

  DataSource.get(SOURCE_FILE,setData,xmlTransform);
};