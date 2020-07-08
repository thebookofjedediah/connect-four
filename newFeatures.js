// customize player color
const form = document.querySelector("#form1");
const colorInput = document.querySelector('#color1');
let player1Color = document.getElementsByClassName('p1');
form.addEventListener("submit", function(e){
  e.preventDefault();
  console.log(player1Color)
  for (let i = 0, max = player1Color.length; i < max; i++) {
  player1Color[i].style.backgroundColor = colorInput.value;
  }
});