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
                      <td class="d">${par[i].Day}</td>
                      <td class="h">${par[i].Hr}</td>
                      <td class="p">${par[i].Place}</td>
                      <td class="t">${par[i].TicketPrice}</td>
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
      let form = `<div class="elF col-4 needs-validation" novalidate>
                    <form action="#">
                        <fieldset>
                        <legend>Hai scelto l'opzione ${par.children('.n').text()}:</legend>
                        <legend>${par.children('.d').text()}, ${par.children('.h').text()}</legend>
                        <legend>${par.children('.p').text()}, ${par.children('.t').text()}</legend>


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
      form += `<div class="form-row">
                
              <div class="form-group col-3">
                  <label for="prefix">Prefix</label>
                  <input type="number" class="form-control" id="prefix" placeholder="+">
              </div>
              <div class="form-group col-9">
                  <label for="tel">Telephone</label>
                  <input type="tel" class="form-control" id="tel" placeholder="Enter phone number">
              </div>
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
                <div class="form-group d-flex justify-content-center">
                   <div class="col-sm-10">
                   <button type="submit" class="booked btn btn-primary">Prenota</button>
                </div>
                </fieldset>
              </form>
            </div>`;

      $('.formAppend').html(form);
      $('form').submit((event) => {
        event.preventDefault();
        validateForm(par);
      })
  })
}

const validateForm = (par) => {

      let errorMsg = '<div class="Msg">Mi spiace, form incompleto.</div>';

      if ($('#name').val() == ""){
        $('#name').siblings('label').append(errorMsg);
          setTimeout(() => {
            $('.Msg').fadeOut(400);
        }, 400);
        return;
      } else if ($('#surname').val() == ""){
          $('#surname').siblings('label').append(errorMsg);
          setTimeout(() => {
            $('.Msg').fadeOut(400);
        }, 400);
          return;
      } else if ($('#mail').val() == ""){
        $('#mail').siblings('label').append(errorMsg);
        setTimeout(() => {
          $('.Msg').fadeOut(400);
      }, 400);
        return;
      } else if ($('#tel').val() == "" || $('#tel').val().length < 10 || $('#tel').val().length > 15){
        $('#tel').siblings('label').append(errorMsg);
        setTimeout(() => {
          $('.Msg').fadeOut(400);
      }, 400);
        return;
      } else if ($('#numTicket').val() == "" || $('#numTicket').val() < 1){
        $('#numTicket').siblings('label').append(errorMsg);
        setTimeout(() => {
          $('.Msg').fadeOut(400);
      }, 400);
        return;
      } else if ($('.selPV option:selected').val() == "Scegli"){
        $('.selPV').siblings('label').append(errorMsg);
        setTimeout(() => {
          $('.Msg').fadeOut(400);
      }, 400);
        return;
      }

      $('.elF').hide();
      let stringConfirm = `<div class="titleList"><div>Complimenti, hai prenotato il concerto!</div>
                          <div>${par.children('.d').text()}, ${par.children('.h').text()},
                          ${par.children('.p').text()}, ${par.children('.t').text()}, Biglietti: ${$('#numTicket').val()}</div></div>`;
      $('.formAppend').append(stringConfirm);
}

// validation Mail - function copied from net

/* function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        return true;
    }
    else {
       return false;
   }

// add to else if for mail
  !(validateEmail($('#tel').val()))
}
 */