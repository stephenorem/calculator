$(document).ready(function(){
  var inputs = [],
      totalString,
      operators = ["+", "-", "*", "/", "."],
      nums = [0,1,2,3,4,5,6,7,8,9],
      LIMIT = 9;
  function getValue(input){
    if (inputs.length >= LIMIT) {
        inputs = ["HIT LIMIT"];
        update();
        setTimeout(function(){
            deleteAll();
            return;
        }, 1700); 
    } else if (operators.includes(inputs[inputs.length-1]) === true && operators.includes(input)){
        console.log("oops - two consecutive operators");
    } else if (inputs.length === 0 && operators.includes(input) === false) {
        inputs.push(input);
    } else if (operators.includes(input)){
        inputs.push(input);
    } else if (nums.includes(Number(input))){
        inputs.push(input);
    } else {
      // bad stuff
      deleteAll();
      return;
    }
    update();
  }
  function update(){
    totalString = inputs.join("");
    $('#steps').html(totalString);
  }
  function getTotal(){
    totalString = inputs.join("");
    var result = eval(totalString);
    if (result % 1 !== 0) {
      result = precisionRound(result, 2);
    } 
    $('#steps').html(result);
    totalString = "";
    inputs = [];
  }
  // from MDN
  function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }
  function substituteZero(){
    $('#steps').html("0");
  }
  function deleteAll(){
      inputs = [];
      substituteZero();
  }
  $('a').on("click", function() {
    if (this.id === "deleteAll") {
        deleteAll();
    } else if (this.id === "backOne") {
        inputs.pop();
        update();
        if (inputs.length === 0 ){
            substituteZero();
        }
    } else if (this.id === 'total') {
          getTotal();
    } else {
          getValue(this.id);
    }
  })
});