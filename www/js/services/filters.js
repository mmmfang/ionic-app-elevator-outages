angular.module('mtaApp.wordFilter', [])
.factory('wordFilter', function(){
  return {
  	test: function(){
  		alert("I'm here")
 		},

 		elorEsc: function(word){
        var charZero = word.charAt(0);
        var charOne = word.charAt(1);

        if (charZero=='E' && charOne=='L') {
          return "Elevator";
        } else {
          return "Escalator";
        }
    },

    filterBoro: function (word) {
        var charCero = word.charAt(0);
        var charUno = word.charAt(1);

        if (charCero=='M' && charUno=='N') {
          return "Manhattan";
        } else if (charCero=='Q' && charUno=='N') {
          return "Queens";
        } else if (charCero=='B' && charUno=='K') {
          return "Brooklyn"
        } else if (charCero=='B' && charUno=='X') {
          return "Bronx"
        } else {
          return "N/A"
     	};
    }
  }
});

