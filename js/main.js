var MAINAPP = (function (nsp, $, domU, strU) {
  console.log(nsp, $, domU, strU , "dev test..");
  // loading the json
  const loadJson = function(path) {
      const xobj = new XMLHttpRequest();
      xobj.overrideMimeType('application/json');
      xobj.open('GET', path);
      xobj.onreadystatechange = function() {
        if (xobj.readyState === 4) {
          contentObj = JSON.parse(xobj.responseText);
          console.log(contentObj, typeof contentObj, "check contentobh");
          parseData(contentObj);
        }
      };
      xobj.send();
    },
    parseData = function(cObj) {
      questionsArray = cObj.questions;

    },
    initiateQuiz = function () {
      loadJson("../JSON/content.json");
    };

    UTIL.domReady(initiateQuiz);
    // console.log("check here");
})(MAINAPP || {}, UTIL);
