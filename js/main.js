var MAINAPP = (function (nsp, $, domU, strU) {
  // console.log(nsp, $, domU, strU , "dev test..");
  // loading the json
  const loadJson = function(path) {
      const xobj = new XMLHttpRequest();
      xobj.overrideMimeType('application/json');
      xobj.open('GET', path);
      xobj.onreadystatechange = function() {
        if (xobj.readyState === 4) {
          contentObj = JSON.parse(xobj.responseText);
          // console.log(contentObj, typeof contentObj, "check contentobh");
          parseData(contentObj);
        }
      };
      xobj.send();
    },
    parseData = function(cObj) {
      questionsArray = cObj.questions;

      // console.log(questionsArray, "console ..... questionArray");
      domU.setHTML($('.fill-in-submit'), cObj.buttonText);

      for(let i = 0; i < questionsArray.length; i++) {
        questionsArray[i] = new Question(questionsArray[i]);
      }

    },
    initiateQuiz = function () {
      loadJson("../JSON/content.json");
    };

    const Question = function(obj){
      console.log(obj, "check obj");
      let htmlDiv;
      //transfer data
      this.questionDiv = (obj.type === "")

      
    };

    UTIL.domReady(initiateQuiz);
    // console.log("check here");
})(MAINAPP || {}, UTIL.dom.$, UTIL.dom, UTIL.string);

