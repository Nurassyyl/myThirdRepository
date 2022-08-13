const title = document.getElementsByTagName('h1');
const handler_btn1 = document.getElementsByClassName("handler_btn");
const handler_btn2 = document.getElementsByClassName("handler_btn");
const screen_btn = document.querySelector(".screen-btn");
const percent = document.querySelectorAll(".percent");
const number = document.querySelectorAll(".number");
const rollback = document.querySelector(".rollback");
const rollbackType = rollback.querySelector("[type = range]")
const rangeValue = rollback.querySelector(".range-value") 
const totalInput = document.getElementsByClassName("total-input")
let screen = document.querySelectorAll(".screen")
console.log(title[0]);
console.log(handler_btn1[0]);
console.log(handler_btn2[1]);
console.log(screen_btn);
console.log(percent);
console.log(number);
console.log(rollbackType);
console.log(rangeValue);
for (let i = 0; i < totalInput.length; i++ ) {
    console.log(totalInput[i]);
}
console.log(screen);