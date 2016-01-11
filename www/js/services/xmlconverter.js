angular.module('mtaApp.xmlconverter', [])

.factory('XmlConverter', ['$http',function($http){
    return {
      get: function(callback){
            $http.get('/feed', {transformResponse:function(data) {
              // convert the data to JSON and provide
              // it to the success function below
                var x2js = new X2JS();
                var json = x2js.xml_str2json( data );
                return json;
              }
            }).success(function(data, status) {
            // send the converted data back to the callback function
              callback(data);
            });
      }
    };
}]);

//http://www.clearlyinnovative.com/working-xml2json-strings-ionic-framework-project
//http://rabidgadfly.com/2013/02/angular-and-xml-no-problem/