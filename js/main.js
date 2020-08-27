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
      setUpNavigation();
    },
    initiateQuiz = function () {
      loadJson("../JSON/content.json");
    };


    var Question = function(obj){
      // console.log(obj, "check obj");
      // let htmlDiv;
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

      // console.log(this.questionDiv, "check this");  

      switch(this.questionDiv) {
        case 'fill-in':
          console.log(this,"hititit");
          this.populateTheQuestion = function() {
            console.log("hehreere");
            this.populateQuestion();
            this.htmlDiv.querySelector('textarea').value = '';
          };
          console.log("middle in");
          this.checkTheAnswer = function() {
            let ans;
            const value = this.htmlDiv.querySelector('textarea').value;
            console.log(value, "check value");
          };
          break;
          default:
            console.log("dsfkdsfl");
            this.populateTheQuestion = function() {
              this.populateQuestion();
            };
            break;
      }
    };

    Question.prototype.populateQuestion = function() {
      //set question text
      alert("kpppkph");
      console.log(this.questionText, "quetext");
      this.questionField.innerHTML = this.questionText;
      this.noAnswerFeed.innerHTML = `<p><span>X</span> ${this.feedback.noAnswer} </p>`;
      this.correctFeed.innderHTML = `<p><span>&#1003</span> ${this.feedback.correctAnswer} </p>`;
      this.inccorrectFeed.innderHTML = `<p><span>&#1003</span> ${this.feedback.wrongAnswer} </p>`;
    };

    Question.prototype.hideQuestion = function() {
      domU.addClass([this.htmlDiv], 'hidden-question');
    };

    Question.prototype.displayQuestion = function() {
      // console.log("diepaly condnf");
      // const checkTheAnswer = this.checkTheAnswer.
      domU.removeClass([this.htmlDiv],'hidden-question');
    }

    //setup Navigation Object
    const setUpNavigation = function() {
      console.log("check naviga");
      let cQuestion = 0;
      navigationProto = {
        questionsArray: questionsArray,
        totalQuestions: questionsArray.lemgth,
        hideQuestion: function() {
          let curQuestion = this.questionsArray[this.currentQuestion];
          curQuestion.hideQuestion();

        },
        showQuestion: function(){
          let newQuestion = this.questionsArray[this.currentQuestion];
          // newQuestion.hideFeedback();
          newQuestion.displayQuestion();
        },
        get currentQuestion() {
          return cQuestion;
        }
      };

      nextButton = Object.create(navigationProto);
      nextButton.goNext = function(){
        console.log("ho next");
      };
      
      navigationProto.showQuestion();
    };

    UTIL.domReady(initiateQuiz);
    // console.log("check here");
})(MAINAPP || {}, UTIL.dom.$, UTIL.dom, UTIL.string);

