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
      // console.log(obj, "check obj");
      let htmlDiv;
      //transfer data
      this.questionDiv = (obj.type === "true-false") ? "multi-choice" : obj.type;
      this.type = obj.type;
      this.id = obj.id;
      this.questionText = obj.questionText;
      this.distractorText = obj.distractors;
      this.correctResp = obj.correctResp;
      this.feedback = obj.feedback;
      this.weight = obj.weight;
      this.result = "no-answer";
      this.studentResp = "";
      this.correct = false;
      
      //Assign DOM Elements
      this.htmlDiv = $(`#${this.questionDiv}`);
      // console.log(this.htmlDiv, "check div");
      this.questionField = this.htmlDiv.querySelector(".question-text");
      this.noAnswerFeed = this.htmlDiv.querySelector(".feedback.no-answer");
      this.correctFeed = this.htmlDiv.querySelector(".feedback.correct");
      this.inccorrectFeed = this.htmlDiv.querySelector(".feedback.incorrect");

      console.log(this, "check this");  

      switch(this.questionDiv) {
        case 'fill-in':
          this.populateTheQuestion = function() {
            this.populateQuestion();
            this.htmlDiv.querySelector('textArea').value = '';
          };
      }
      Question.prototype.populateQuestion = function() {
        //set question text
        this.questionField.innerHTML = this.questionText;
        this.noAnswerFeed.innerHTML = `<p><span>X</span> ${this.feedback.noAnswer} </p>`;
        this.correctFeed.innderHTML = `<p><span>&#1003</span> ${this.feedback.correctAnswer} </p>`;
        this.inccorrectFeed.innderHTML = `<p><span>&#1003</span> ${this.feedback.wrongAnswer} </p>`;

      }

    };


    UTIL.domReady(initiateQuiz);
    // console.log("check here");
})(MAINAPP || {}, UTIL.dom.$, UTIL.dom, UTIL.string);

