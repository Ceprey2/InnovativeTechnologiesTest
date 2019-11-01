document.getElementById("txtArQuestion").style.fontSize = "xx-large";
document.getElementById("variantBtn1").style.fontSize = "xx-large";
document.getElementById("variantBtn2").style.fontSize = "xx-large";
document.getElementById("variantBtn3").style.fontSize = "xx-large";
document.getElementById("variantBtn4").style.fontSize = "xx-large";








class Test {
    constructor(questAmount, variantsAmount) {
        this.questAmount = questAmount;
        this.variantsAmount = variantsAmount;
        this.questionOrder=0;
       this.countCorrect = 0;
        this.countInorrect = 0;
       this.questions = [];



    }
}

 innovTest = new Test(10,4);

function readJson(filename)
{
    console.log('Reading data from json file ' + filename);
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filename, false);
    let result;

    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0) {

                rawTextFromFile = (rawFile.responseText);
                result = JSON.parse(rawTextFromFile);

            }
        }
    }
    rawFile.send(null);
    return result;

}

function readData() {

    var i = 0;
    var txt = "";
    i = 0;
    var x28 = "t";
    var x49 = "f";
    var g43 = "g";
    var y29 = "e";
    var x19 = "f";
    var z = "s";
    var k1 = "f";
    var x9 = "j";
    var v1 = "d";
    var g1 = "t";
    var h1 = ".";

    var i1 = "j";
    var y1 = "i";
    var j1 = "s";
    var z1 = "n";
    var z22 = "o";
    var x01 = "v";
    txt = "";
    var k1 = "o";
    var n1 = "h";
    var l1 = "n";
    var t = "$.getJSON";
    var b1 = "f";
    var m1 = x28+y29+z+g1+h1+i1+j1+k1+l1;
    var m1 = x28 + y29 + z + g1 + y1 + z1 + z1 + k1 + x01 + h1 + i1 + j1 + k1 + l1;
    var file = "questions.json";

    $.getJSON(m1, function (data) {
        $.each(data, function (key, val) {
            innovTest.questions.push(data[i]);
           // console.log("pushing " +i);
          //  console.log(questions[i]);
            i++;
        });
    });

    console.log("Data has been read successfully2 " + innovTest.questions.length);
    return  innovTest.questions;
}

function initButtons () {

    $("#variantBtn1").click(function () {
        evaluateAns(this.id, $('#' + this.id).text());
    });


    $("#variantBtn2").click(function () {
        evaluateAns(this.id, $('#' + this.id).text());
    });


    $("#variantBtn3").click(function () {
        evaluateAns(this.id, $('#' + this.id).text());
    });


    $("#variantBtn4").click(function () {
        evaluateAns(this.id, $('#' + this.id).text());
    });

}

function communicateResult()
{
    alert("You've got "+innovTest.countCorrect+ "points");

    for (var variantsCounter = 1; variantsCounter<innovTest.variantsAmount+1; variantsCounter++){ // Buttons are numberd 1-4
        console.log ("Disabling buttons");
        $("#variantBtn"+variantsCounter).attr("disabled", false);
    }
}

function twinkleCorrectButton(button_id)
{

    $('#'+button_id).css('color','black');

    $('#'+button_id).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}


function twinkleWrongAndCorrectButton(wrong_button_id, correct_button_id)
{

    $('#'+wrong_button_id).css('color','black');

    $('#'+wrong_button_id).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);


    $(correct_button_id).css('color','black');

    $(correct_button_id).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

}


function evaluateAns(button_id, buttonText){

    let correctAns= innovTest.questions[innovTest.questionOrder]["correctVariant"];
    let correct_button_id;
    console.log("Evaluating answer"+button_id);
    console.log("Current correct answer "+ correctAns);

    if (buttonText == correctAns) {

        $('#txtArQuestion').text("Правильно!");
        document.getElementById(button_id).style.background = 'green';
        innovTest.countCorrect++;
                    for (var variantsCounter = 1; variantsCounter<innovTest.variantsAmount+1; variantsCounter++){ // Buttons are numberd 1-4
                        console.log ("Disabling buttons");
                        $("#variantBtn"+variantsCounter).attr("disabled", false);

                    }
        temps = 900;
      twinkleCorrectButton(button_id);
    }
    else {
        document.getElementById(button_id).style.background = 'red';

        $('#txtArQuestion').text("Неправильно!");
        innovTest.countInorrect++;

                    for (var variantsCounter = 1; variantsCounter<innovTest.variantsAmount+1; variantsCounter++){ // Buttons are numberd 1-4
                        console.log ("Disabling buttons"+ $("#variantBtn"+variantsCounter).text());
                        if ($("#variantBtn"+variantsCounter).text()==correctAns){
                            correct_button_id = "#variantBtn"+variantsCounter;
                           $(correct_button_id).css('background-color','green');
                        }
                        $("#variantBtn"+variantsCounter).attr("disabled", false);
                    }

        twinkleWrongAndCorrectButton(button_id, correct_button_id);
    }

    if (innovTest.questionOrder>=innovTest.questAmount) {

       setTimeout(communicateResult, 1500);

    } else {
        innovTest.questionOrder++;
        setTimeout( function(){ setQuestion(innovTest.questions[innovTest.questionOrder]); }, 1500);
        }
}

function setQuestion(currentQuestion) {
    console.log("Amount of questions in class instance "+innovTest.variantsAmount);

                for (var variantsCounter = 1; variantsCounter<innovTest.variantsAmount+1; variantsCounter++){ // Buttons are numberd 1-4
                    console.log ("Enabling buttons");
                    $("#variantBtn"+variantsCounter).css('background-color','#E9E7F2');
                }

    console.log("questions length " +innovTest.questions.length);
    console.log("current question object ");
    console.log("current Question ");
    console.log(currentQuestion);

    let question = currentQuestion['original'];

    $('#txtArQuestion').text(question);
    console.log("Question text "+question);
    console.log("Var amount"+ innovTest.variantsAmount+1);

    for (var variantsCounter = 1; variantsCounter<innovTest.variantsAmount+1; variantsCounter++){ // Buttons are numberd 1-4
        let buttonName = "variant"+variantsCounter;
        console.log ("777Text of the button "+currentQuestion[buttonName]);
        $("#variantBtn"+variantsCounter).text(currentQuestion[buttonName]);
    }
    console.log("Finishes setting question2 "+ new Date());
}

function shuffleArr(arr)
{
    arr.sort(function() {
        return .5 - Math.random();
    });
}

function buildIntArrayWithLenght(lenght) {
    let array = [];
    for(let i = 0; i < lenght; i++) {
        array.push(i);
    }
    return array;
}

function init() {
    innovTest.questions = readJson('testinnov.json');
    // questionNumbers = buildIntArrayWithLenght(innovTest.questions.length);
    console.log('questionssssssssssss34534 ' + innovTest.questions.length);
    console.log('array');
   // console.log(questionNumbers);
    shuffleArr(innovTest.questions);
    console.log('array after');
   // console.log(questionNumbers);
    setQuestion(innovTest.questions[0]);
    initButtons();
}
init();