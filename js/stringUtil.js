var UTIL = (function(s){
//set up sub module
var sub = s.string = s.string || {};

    const numChar = function(str, char){
        return (str.split(char).length - 1);
    },
    breakOut = function(str, delimeter) {
        const arr = str.split(delimeter);
        return arr.map(function(value){
            return value.trim();
        });
    };

    //punlic method
    sub.numChar = numChar;
    sub.breakOut = breakOut;

    return s;

})(UTIL || {});