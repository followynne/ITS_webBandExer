import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/css/bootstrap.css'
import images from './img/*.jpg'

$(document).ready(() => {

  $(".clickable").on('click', (event) => {
      visualizeDiv($(event.target));
  })

  fetch('http://localhost:3000/album').then((result) => result.json())
  .then((data) => {
      let dati = data;
      let albumCreation = "", songsCreation = "";
      for (let i = 0; i < dati.length; i++){
        albumCreation += `<div class="col col-lg-3 col-sm-6 col-12 d-flex justify-content-center align-items-center">
                            <ol class="titleList songs"><div class="test d-flex justify-content-center align-items-center">${dati[i].titolo} ${dati[i].anno}</div>
                            <img class="albumImg d-flex justify-content-center align-items-center" src="${dati[i].copertina}" alt="album"/>
                            </ol>
                          
                          </div>`
        $('.albumInfo').html(albumCreation);
      }
      
      for (let i = 0; i < dati.length; i++){ 
        songsCreation = "";
          for (let j of dati[i].canzoni){
            songsCreation += `<li class="center d-flex justify-content-center align-items-center">${j.nome}, 
                              ${j.durata}</li>`;
          }
          $(".songs").eq(i).append(songsCreation);
      }
  });

})

const visualizeDiv = (click) => {
  if (click.siblings('.infoComp').is(':hidden')){
    click.siblings('.infoComp').slideDown();
  } else {
    click.siblings('.infoComp').slideUp();
  }
}