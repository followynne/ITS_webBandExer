import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

function visualizeDiv() {
  var prova = document.querySelector(".descriptionAndImg");
  prova.style.display = "block";
}


function changeVisibility (par1, par2) {
  for (i = 0; i < par1.length; i++) {
    par1[i].style.display = par2;
  }
}