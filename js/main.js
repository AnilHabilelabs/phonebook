let table = document.querySelector(".contactTable");

// function validation(e){
//   for(let i =0;i<e.target[i]-2;i++){
//     if(e.target[i].value == ""){
//       return false;
//     }
//   }
//   saveContact(e);
// }

function saveContact(e) {
  e.preventDefault();
  let fullname = document.querySelector("#fullname").value.trim();
  let telephone = document.querySelector("#telephone").value.trim();
  let email = document.querySelector("#email").value.trim();
  // console.log(fullname, telephone, email);
  let contacts = { fullname: fullname, telephone: telephone, email: email };
  let contact_string = JSON.stringify(contacts);
  localStorage.setItem(email, contact_string);

  let element = ` <tr class="td_tr">
    <td class="sr">${localStorage.length}</td>
    <td>${fullname}</td>
    <td>${telephone}</td>
    <td>${email}</td>
    <td> <i class="fa fa-pencil-square-o" aria-hidden="true"> </i> <i class="fa fa-trash-o deleteicon"></i></td>
    <td></td>
    
  </tr>`;
  table.innerHTML += element;
  noContact();
}

let count;
let storage = localStorage;

for (count = 0; count < storage.length; count++) {
  let dataFetch = JSON.parse(localStorage.getItem(storage.key(count)));

  table.innerHTML += ` <tr class="td_tr">
    <td class="sr">${count + 1}</td>
    <td>${dataFetch.fullname}</td>
    <td>${dataFetch.telephone}</td>
    <td>${dataFetch.email}</td>
    <td> <i class="fa fa-pencil-square-o editicon" aria-hidden="true">  <i class="fa fa-trash-o deleteicon"></i></td>
  </tr>`;
}

// no contact text function
function noContact() {
  if (storage.length > 0) {
    document.getElementsByClassName("noContact")[0].innerHTML = "";
  }
}
noContact();

function deleteContact() {
  let deleteIcon = document.querySelectorAll(".deleteicon");
  deleteIcon.forEach((element) => {
    element.onclick = function () {
      console.log("hello");
      let delTr = this.parentElement.parentElement;
      console.log(delTr);

    };
  });
}



function editContact(){
  let editIcons = document.querySelectorAll(".editicon");
  editIcons.forEach((element) => {
    element.onclick = function () {
      console.log("hii");
      let editTr = this.parentElement.parentElement;
      console.log(editTr);
    };
  });
}
editContact();
deleteContact();