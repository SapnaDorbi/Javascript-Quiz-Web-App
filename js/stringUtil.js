var UTIL = (function(s){
//set up sub module
var sub = s.string = s.string || {};

    const numChar = function(str, char){
        return (str.split(char).length - 1);
    };

    //punlic method
    sub.numChar = numChar;

    return s;

})(UTIL || {});