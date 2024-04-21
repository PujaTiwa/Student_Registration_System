const recordForm = document.getElementById('record-form');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');
const idInput = document.getElementById('std');
const rollNoInput = document.getElementById('roll_no');
const recordList = document.getElementById('record-list');
const editIndexInput = document.getElementById('edit-index');

// ------------------------- Initialize records from local storage  --------------------------
let records = JSON.parse(localStorage.getItem('records')) || [];
console.log(records.length);
// Function to check for duplicate names
function isDuplicateName(email) {
  return records.some(
    (record) => record.email.toLowerCase() === email.toLowerCase()
  );
}

// -------------------------------- Display records  -----------------------------------------
function displayRecords() {
  recordList.innerHTML = '';
  console.log(records.length);
  if (records.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="10" style="text-align:center;color:white; ">No Record Found</td>`;
    recordList.appendChild(row);
  } else {
    records.forEach((record, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
                    <td>${record.name}</td>
                    <td>${record.age}</td>
                    <td>${record.email}</td>
                    <td>${record.std}</td>
                    <td>${record.roll_no}</td>
                    <td><button onclick="editRecord(${index})">Edit</button></td>
                    <td class="deleteButton"><button onclick="deleteRecord(${index})">Delete</button></td>
                `;
      recordList.appendChild(row);
    });
  }
}

// --------------------------------  Add or Update a record  ----------------------------------
recordForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = nameInput.value;
  const age = ageInput.value;
  const email = emailInput.value;
  const std = idInput.value;
  const roll_no = rollNoInput.value;
  const editIndex = parseInt(editIndexInput.value);

  if (name && age && email && std && roll_no) {
    if (isDuplicateName(email) && editIndex === -1) {
      alert('Student already exists.');
      return;
    }

    if (editIndex === -1) {
      // Add a new record
      records.push({ name, age, email, std, roll_no });
    } else {
      // Update an existing record
      records[editIndex] = { name, age, email, std, roll_no };
      editIndexInput.value = -1;
    }

    localStorage.setItem('records', JSON.stringify(records));
    nameInput.value = '';
    ageInput.value = '';
    emailInput.value = '';
    idInput.value = '';
    rollNoInput.value = '';
    displayRecords();
  }
});

// ------------------------------- Edit a record  --------------------------------------------
function editRecord(index) {
  const recordToEdit = records[index];
  nameInput.value = recordToEdit.name;
  ageInput.value = recordToEdit.age;
  emailInput.value = recordToEdit.email;
  idInput.value = recordToEdit.std;
  rollNoInput.value = recordToEdit.roll_no;
  editIndexInput.value = index;
}

// ------------------------------- Delete a record  ------------------------------------------
function deleteRecord(index) {
  displayRecords();
  let delBtn = document.querySelectorAll('.deleteButton');
  console.log(delBtn);
  delBtn[
    index
  ].innerHTML = `<i id="yesBtn" onclick="confirmDelete(${index})" class="fa-solid fa-check"></i><i id="noBtn" onclick="resetDelete(${index})" class="fa-solid fa-xmark"></i>`;
}

function confirmDelete(index) {
  records.splice(index, 1);
  localStorage.setItem('records', JSON.stringify(records));
  displayRecords();
}

function resetDelete(index) {
  displayRecords();
}

// -------------------------------  Initial display -------------------------------------------
displayRecords();

// ------------------------------ Input Validations  -------------------------------------------

function nameLetter() {
  let name = document.querySelector("#name").value;

  let letters = /^[A-Za-z]*$/;
  if (letters.test(name)) {
    return true;
  } else {
    alert("Student Name is not valid...");
    return false;
  }
}

function emailValidate() {
  let emailCheck = document.querySelector("#email").value;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailRegex.test(emailCheck)) {
    return true;
  } else {
    alert("Email is not valid...");
    return false;
  }
}

function studentId() {
  let stuId = document.querySelector("#std").value;

  const noRegex = /^\d{7}$/;
  if (noRegex.test(stuId)) {
    return true;
  } else {
    alert("Invalid Student id....");
    return false;
  }
}

function checkValidate() {

  let p1 = nameLetter();
  let p2 = emailValidate();
  let p3 = studentId();

  console.log(p1);
  console.log(p2);
  console.log(p3);

  if (p1 && p2 && p3) {
    alert("Student Registered Successfully..!");
    return true;
  } else {
    alert("One or More Fields are incorrectly set");
    return false;
  }
}

// ------------------------------------ Vertical Scrollbar  ------------------------------------

let tableContainer = document.querySelector('.example-table tbody');

tableContainer.style.overflowY = 'scroll';
tableContainer.style.maxHeight = '300px';
// tableContainer.style.alwaysVisible = true; 