var MAINAPP = (function (nsp, $, domU, strU) {
  // console.log(nsp, $, domU, strU , "dev test..");
  // loading the json
  let questionsArray = [];
  
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
          this.populateTheQuestion = function() {
            this.populateQuestion();
            this.htmlDiv.querySelector('textarea').value = '';
          };
          this.checkTheAnswer = function() {
            let ans;
            const value = this.htmlDiv.querySelector('textarea').value;
            // console.log(value, "check value");
            if(value) {
              // console.log(this.correctResp, "check correct resp");
              ans = strU.breakOut(this.correctResp, ",");
              this.correct = ans.every(function(val){
                return (value.indexOf(val) > -1);
              });
              this.result = (this.correct) ? 'correct' : 'incorrect';
            }
            this.hideFeedback();
            this.displayFeedback();
          };
          break;
          case 'multi-choice':
            const distractors = this.htmlDiv.querySelectorAll('label'),
              distractorsRadio = this.htmlDiv.querySelectorAll('input');
            this.populateTheQuestion = function(){
              this.populateQuestion();
              for (let i=0; i < distractors.length; i ++){
                if(this.distractorText[i] !== undefined) {
                  distractors[i].innerHTML = this.distractorText[i];
                }
              }
            };
            this.checkTheAnswer = function() {
              for(let i = 0; i < distractors.length; i++) {
                if(distractorsRadio[i].checked) {
                  this.studentResp = $(`#${distractorsRadio[i].id}_label`).innerHTML;
                }
              }

              if(this.studentResp !== ""){
                this.correct = this.studentResp === this.correctResp;
                this.result = (this.correct) ? 'correct' : 'incorrect';
              }
              this.hideFeedback();
              this.displayFeedback();
            };
            break;
          default:
            this.populateTheQuestion = function() {
              this.populateQuestion();
            };
            break;
      }
    };

    Question.prototype.populateQuestion = function() {
      //set question text
      // console.log(this.feedback, "quetext");
      this.questionField.innerHTML = this.questionText;
      this.noAnswerFeed.innerHTML = `<p><span>X</span> ${this.feedback.noAnswer} </p>`;
      this.correctFeed.innerHTML = `<p><span>&#1003</span> ${this.feedback.correctAnswer} </p>`;
      this.inccorrectFeed.innerHTML = `<p><span>X</span> ${this.feedback.wrongAnswer} </p>`;
    };

    Question.prototype.hideQuestion = function() {
      domU.addClass([this.htmlDiv], 'hidden-question');
    };

    Question.prototype.displayQuestion = function() {
      // console.log(this.checkTheAnswer,"diepaly condnf");
      const checkTheAnswer = this.checkTheAnswer.bind(this);
      domU.removeClass([this.htmlDiv],'hidden-question');
      domU.assignEvent(this.htmlDiv.querySelectorAll('.fill-in-submit.btn-primary'),'click', function(){
        checkTheAnswer();
      });
    };

    Question.prototype.displayFeedback = function() {
      const feedback = $(`.feedback.${this.result}`);
      domU.addClass(feedback, 'visible');
    }
    Question.prototype.hideFeedback = function() {
      const feedback = $(`.feedback.visible`);
      domU.removeClass(feedback,'visible');
    }

    //setup Navigation Object
    const setUpNavigation = function() {
      let cQuestion = 0;
      navigationProto = {
        questionsArray: questionsArray,
        totalQuestions: questionsArray.length,
        hideQuestion: function() {
          let curQuestion = this.questionsArray[this.currentQuestion];
          curQuestion.hideQuestion();

        },
        showQuestion: function(){
          let newQuestion = this.questionsArray[this.currentQuestion];
          newQuestion.populateTheQuestion();
          newQuestion.displayQuestion();
        },
        get currentQuestion() {
          return cQuestion;
        },
        set currentQuestion(value) {
          cQuestion = value;
        }
      };

      nextButton = Object.create(navigationProto);
      nextButton.goNext = function(e){
        if(this.currentQuestion < this.totalQuestions - 1) {
          this.hideQuestion();
          this.currentQuestion = this.currentQuestion + 1;
          this.showQuestion();
        }
      };

      prevButton = Object.create(navigationProto);
      prevButton.goPrev = function(){
        if(this.currentQuestion > 0) {
          this.hideQuestion();
          this.currentQuestion = this.currentQuestion - 1;
          this.showQuestion();
        }
      };
      
      domU.assignEvent($('.btn-prev'),'click',function(e){
        prevButton.goPrev(e);
      });

      domU.assignEvent($('.btn-next'),'click',function(e){
        nextButton.goNext(e);
      });

      navigationProto.showQuestion();
    };

    UTIL.domReady(initiateQuiz);
    
})(MAINAPP || {}, UTIL.dom.$, UTIL.dom, UTIL.string);

