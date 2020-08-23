var MAINAPP = (function () {
  // loading the json
  var loadJsonbkp = function (path) {
    //   console.log("check control here");
      var xobj = new XMLHttpRequest();
    //   console.log("herer..plp");
      xobj.overrideMimeType('application/json');
    //   console.log("now check");
      xobj.open("GET", path);
    //   console.log("check here de..v");
      xobj.onreadystatechange = function () {
          alert("check gere");
          console.log(xobj.readyState , "dev");
        if (xobj.readyState === 4) {
          contentObj = JSON.parse(xobj.responseText);
          console.log(contentObj, "check contentobj");
        }
      };
    },
     loadJson = function(path) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType('application/json');
        xobj.open('GET', path);
        xobj.onreadystatechange = function() {
              console.log("now check");
            if (xobj.readyState === 4) {
                contentObj = JSON.parse(xobj.responseText);
                //console.log(contentObj);
                parseData(contentObj);
            }
        };
        xobj.send(null);
    },
    parseData = function(cObj) {
        questionsArray = cObj.questions;
        //set button text
        domU.setHTML($('.fill-in-submit'), cObj.buttonText);
        
        for (let i = 0; i < questionsArray.length; i++) {
            questionsArray[i] = new Question(questionsArray[i]);
        }
        console.log(questionsArray);
        setUpNavigation();
    },
    initiateQuiz = function () {
      loadJson("../JSON/content.json");
    };

    UTIL.domReady(initiateQuiz);
    // console.log("check here");
})(MAINAPP || {}, UTIL);
