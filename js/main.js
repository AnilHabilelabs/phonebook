let table = document.querySelector(".contactTable");

function validation(e) {
  console.log(e);
  for (let i = 0; i < e.target.length - 2; i++) {
    if (e.target[i].value == "") {
      alert(e.target[i].name + " cannot be empty");
      return false;
    }
  }
  saveContact(e);
}

function saveContact(e) {
  e.preventDefault();
  let fullname = document.querySelector("#fullname").value.trim();
  let telephone = document.querySelector("#telephone").value.trim();
  let email = document.querySelector("#email").value.trim();
  let btn = document.querySelector(".savebtn");

  // console.log(fullname, telephone, email);
  let contacts = { fullname: fullname, telephone: telephone, email: email };
  let contact_string = JSON.stringify(contacts);

  if (btn.innerHTML == "Save") {
    localStorage.setItem(localStorage.length + 1, contact_string);
  } else {
    localStorage.setItem(btn.getAttribute("data_num"), contact_string);
  }

  let element = ` <tr class="td_tr">
    <td class="sr">${localStorage.length}</td>
    <td>${fullname}</td>
    <td>${telephone}</td>
    <td>${email}</td>
    <td> <i class="fa fa-pencil-square-o editicon" aria-hidden="true">  </i>
    <i class="fa fa-trash-o deleteicon"> </i>
    </td>
    
  </tr>`;
  table.innerHTML += element;
  noContact();
  location.reload();
}

let count;
let storage = localStorage;

for (count = 1; count <= storage.length; count++) {
  let dataFetch = JSON.parse(localStorage.getItem(count));
  table.innerHTML += ` <tr class="td_tr">
    <td class="sr">${count}</td>
    <td>${dataFetch.fullname}</td>
    <td>${dataFetch.telephone}</td>
    <td>${dataFetch.email}</td>
    <td> <i class="fa fa-pencil-square-o editicon" aria-hidden="true">  </i>
    <i class="fa fa-trash-o deleteicon"> </i>
    </td>
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
      // console.log("hello");
      let delTr = this.parentElement.parentElement;
      // console.log(delTr);
      let titleName = delTr.querySelectorAll("td")[0].innerText.trim();
      localStorage.removeItem(titleName);
      location.reload();
    };
  });
}

function editContact() {
  let editIcons = document.querySelectorAll(".editicon");
  editIcons.forEach((element) => {
    element.onclick = function () {
      // console.log(element);
      let editTr = this.parentElement.parentElement;
      // console.log(editTr);
      let titleName = editTr.querySelectorAll("td")[0].innerText.trim();
      let contact = localStorage.getItem(titleName);
      let contact_obj = JSON.parse(contact);
      console.log(contact_obj);
      document.getElementById("fullname").value = contact_obj.fullname;
      document.getElementById("telephone").value = contact_obj.telephone;
      document.getElementById("email").value = contact_obj.email;
      console.log(document.getElementsByClassName("savebtn"));
      document.getElementsByClassName("savebtn")[0].innerText = "Update";
      document
        .getElementsByClassName("savebtn")[0]
        .setAttribute("data_num", titleName);
    };
  });
}
editContact();
deleteContact();

function cancelbtn() {
  document.getElementsByClassName("formDiv").reset();
}

