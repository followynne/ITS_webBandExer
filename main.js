import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/css/bootstrap.css';

$(document).ready(() => {

  $(".clickable").on('click', (event) => {
      visualizeDiv($(event.target));
  })

  fetch('http://localhost:3000/album').then((result) => result.json())
  .then((data) => {
      let dati = data;
      console.log(dati.length)
      let albumCreation = "", songsCreation = "";
      for (let i = 0; i < dati.length; i++){
        albumCreation += `<div class="col col-3>
                          <div class= "col-lg-3 col-sm-6 temp">
                            <ol class="songs">${dati[i].titolo} ${dati[i].anno}
                            </ol>
                          </div>
                          </div>`
        console.log(albumCreation)
        $('.albumInfo').html(albumCreation);
      }
      
      for (let i = 0; i < dati.length; i++){ 
        songsCreation = "";
          for (let j of dati[i].canzoni){
            songsCreation += `<li>${j.nome}, 
                              ${j.durata}</li>`;
          }
          $(".songs").eq(i).append(songsCreation);
      }
  });

})


const visualizeDiv = (click) => {
  if (click.siblings('.infoComp').is(':hidden')){
    click.siblings('.infoComp').show();
  } else {
    click.siblings('.infoComp').hide();
  }
}