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

  fetch('http://localhost:3000/concerti').then((res) => res.json()).then((data) => {
        let datiConcerti = data;
        createTableConcerti(datiConcerti);
        $('.clickBtt').on('click', (event) => {

          let e = $(event.target);
          e = e.closest('.cl');

          if (e.children('.av').text() == "y"){
            createForm(e);
          } else {
            alert('L\'opzione da te scelta è piena!')
          }
        })
  });
});

const visualizeDiv = (click) => {
  if (click.siblings('.infoComp').is(':hidden')){
    click.siblings('.infoComp').slideDown();
  } else {
    click.siblings('.infoComp').slideUp();
  }
}

const createTableConcerti = (par) => {

    let table = `<div class="col">
                  <table class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">${Object.keys(par[0])[0]}</th>
                        <th scope="col">${Object.keys(par[0])[1]}</th>
                        <th scope="col">${Object.keys(par[0])[2]}</th>
                        <th scope="col">Ticket Price</th>
                        <th scope="col">${Object.keys(par[0])[4]}</th>
                        <th scope="col">Prenota il tuo biglietto!</th>
                      </tr>
                    </thead>
                    <tbody>`;
    for (let i=0; i < par.length; i++){
        table += `<tr class="cl">
                      <th class="n" scope="row">${i+1}</th>
                      <td>${par[i].Day}</td>
                      <td>${par[i].Hr}</td>
                      <td>${par[i].Place}</td>
                      <td>${par[i].TicketPrice}</td>
                      <td class= "av">${par[i].Available}</td>
                      <td class="clickBtt"><input type="button" value="Prenota!" class="bookedButton"></button></td>
                  </tr>`
    }
    table += `    </tbody>
                </table>
              </div>`;
    $('.prenotaBlankDiv').html(table);
};

const createForm = (par) => {
    fetch('https://raw.githubusercontent.com/dakk/Italia.json/master/italia.json').then((res) => res.json()).then((data) => {
      let form = `<div class="elF col-5 needs-validation" novalidate>
                    <form action="#">
                        <fieldset>
                        <legend>Hai scelto l'opzione ${par.children('.n').text()}</legend>
                        <div class="form-group">
                            <label for="name">Nome:</label>
                            <input type="text" class="form-control" id="name" placeholder="Enter name">
                          </div>
                        <div class="form-group">
                                <label for="surname">Cognome:</label>
                                <input type="text" class="form-control" id="surname" placeholder="Enter surname">
                        </div>
                        <div class="form-group">
                                <label for="mail">E-mail</label>
                                <input type="email" class="form-control" id="mail" placeholder="Enter email">
                        </div>`
      form += `<div class="form-group">
                  <label for="tel">Telephone</label>
                  <input type="tel" class="form-control" id="tel" placeholder="Enter phone number">
              </div>
              <div class="form-group">
                  <label for="numTicket">N. Biglietti</label>
                  <input type="number" class="form-control" id="numTicket">
              </div>
              <div class="form-group">
                  <label>Provincia</label>
                  <select class="selPV custom-select">
                    <option>Scegli</option>`;
                    for (let i=0; i<data.regioni.length; i++){
                        for (let j=0; j<data.regioni[i].province.length; j++){
                           form += `<option>${data.regioni[i].province[j]}</option>`;
                        }
                    };
        form += `</select></div>
                <div class="form-group ">
                   <div class="col-sm-10">
                   <button type="submit" class="booked btn btn-primary">Prenota</button>
                </div>
                </fieldset>
              </form>
            </div>`;

      $('.formAppend').html(form);
      $('form').submit((event) => {
        event.preventDefault();
        validateForm();
      })
  })
}

// Avviso: Rispetto alle richieste, non funzionano il controllo del form nei casi di:
// - telefono inserito non completo o non corretto
// - provincia non indicata.

const validateForm = () => {

      let errorMsg = '<div class="Msg">Mi spiace, form incompleto.</div>';

      if ($('#name').val() == ""){
        $('#name').siblings('label').append(errorMsg);
          setTimeout(() => {
            $('.Msg').fadeOut(500);
        }, 1000);
        return;
      } else if ($('#surname').val() == ""){
          $('#surname').siblings('label').append(errorMsg);
          setTimeout(() => {
            $('.Msg').fadeOut(500);
        }, 1000);
          return;
      } else if ($('#mail').val() == ""){
        $('#mail').siblings('label').append(errorMsg);
        setTimeout(() => {
          $('.Msg').fadeOut(500);
      }, 1000);
        return;
      } else if ($('#tel').val() == ""){
        $('#tel').siblings('label').append(errorMsg);
        setTimeout(() => {
          $('.Msg').fadeOut(500);
      }, 1000);
        return;
      } else if ($('#numTicket').val() == "" || $('#numTicket').val() < 1){
        $('#numTicket').siblings('label').append(errorMsg);
        setTimeout(() => {
          $('.Msg').fadeOut(500);
      }, 1000);
        return;
      } else if ($('.selPV option:selected').val() == "Scegli"){
        $('.selPV').siblings('label').append(errorMsg);
        setTimeout(() => {
          $('.Msg').fadeOut(500);
      }, 1000);
        return;
      }

      $('.elF').hide();
      $('.formAppend').append('<div>Complimenti, hai prenotato il concerto!');
}