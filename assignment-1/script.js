// Your JS code goes here
// util func
function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
// ----------------------------------------------
// init data
/*
  * object structure for book
  * name: string
  * author: string
  * topic: string (Programming, Database, Devops)
  * pureName: string (unicode string without any special characters and lowercased)
*/

let bouncingTime = undefined;
class currentData {
  constructor() {
    let innitialBooks = [
      {
        name: "Refactoring",
        author: "Martin Fowler",
        topic: "Programming",
        pureName: "refactoring"
      },
      {
        name: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        topic: "Database",
        pureName: "designing data-intensive applications"
      },
      {
        name: "The Phoenix Project",
        author: "Gene Kim",
        topic: "Devops",
        pureName: "the phoenix project"
      }
    ]
    if (localStorage.getItem("currentData") !== null) {
      console.log("parse data")
      this.books = JSON.parse(localStorage.getItem("currentData"));
    }
    else {
      localStorage.setItem("currentData", JSON.stringify(innitialBooks));
      this.books = innitialBooks;
    }
  }
  addBook(book) {
    book.pureName = removeAccents(book.name).toLowerCase();
    this.books.push(book);
    localStorage.setItem("currentData", JSON.stringify(this.books));
  }
  deleteBook(bookName) {
    this.books = this.books.filter((item) => item.pureName !== removeAccents(bookName).toLowerCase());
    localStorage.setItem("currentData", JSON.stringify(this.books));
  }
  searchBook(bookName) {
    console.log("searchbook", removeAccents(bookName))
    return this.books.filter((item) => item.pureName.includes(removeAccents(bookName).toLowerCase()));
  }
  getBooks() {
    return this.books;
  }
}
const data = new currentData();

function createTableOfBooks(data) {
  const tableBody = document.querySelector("#searchRes tbody");
  tableBody.innerHTML = "";
  data.forEach((book) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td colspan="2">${book.name}</td>
    <td>${book.author}</td>
    <td>${book.topic}</td>
    <td><a class="deleteLink">Delete</a></td>
    `;
    tableBody.appendChild(row);
  })
  setEventOpenModalForTable();
}
createTableOfBooks(data.getBooks());
// -----------------init-----------------------------
// search
const searchBar = document.querySelector("#searchBar")
searchBar.addEventListener("keydown", function (ev) {
  console.log("searching target value", ev.target.value)
  console.log("event key down", ev.keyCode)

  if (bouncingTime) clearTimeout(bouncingTime);
  if (ev.keyCode === 13) {
    searchBook(ev.target.value);
    searchBar.blur()
    return;
  }
  bouncingTime = setTimeout(() => searchBook(ev.target.value), 1000);
})
function searchBook(name) {
  console.log("searching function", name)
  const list = data.searchBook(name);
  createTableOfBooks(list)
}
// -----------------search--------------------------
// open and close modal
// * open modal
document.getElementById("add").addEventListener("click", function () {
  console.log("clicked add book")
  document.querySelector("#addBookModalOverlay").style.visibility = "visible";
})
function setEventOpenModalForTable() {

  document.querySelectorAll(".deleteLink").forEach((element) => {
    element.addEventListener("click", function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      const deletedRowId = ev.target.parentElement.parentElement.rowIndex
      console.log("clicked delete book row", deletedRowId)

      const modal = document.querySelector("#deleteBookModalOverlay");
      modal.style.visibility = "visible";
      const markedTag = modal.querySelector(".deleteName")
      markedTag.textContent = ev.target.parentElement.parentElement.querySelector("td").textContent;
      markedTag.setAttribute("id", deletedRowId)
    })
  })
}
// * close modal
// ** close button
document.querySelectorAll(".closeAct").forEach((element) => {
  element.addEventListener("click", function () {
    console.log("clicked close button")
    document.querySelector("#addBookModalOverlay").style.visibility = "hidden";
    document.querySelector("#deleteBookModalOverlay").style.visibility = "hidden";
  })
})
// ** overlay
document.querySelectorAll(".overlay").forEach((element) => {
  element.addEventListener("click", function (ev) {
    if (ev.target !== element) return;
    console.log("clicked overlay")
    document.querySelector("#addBookModalOverlay").style.visibility = "hidden";
    document.querySelector("#deleteBookModalOverlay").style.visibility = "hidden";
  })
})
// ** esc
document.addEventListener("keydown", function (ev) {
  if (ev.keyCode === 27) {
    document.querySelector("#addBookModalOverlay").style.visibility = "hidden";
    document.querySelector("#deleteBookModalOverlay").style.visibility = "hidden";
  }
})
//-------------modal---------------------------
// add book
document.querySelector("#addBookModalOverlay form").addEventListener("submit", function (ev) {
  ev.preventDefault();
  ev.stopPropagation();
  const book = {
    name: ev.target.querySelector("#nameBook").value,
    author: ev.target.querySelector("#authorBook").value,
    topic: ev.target.querySelector("#topicBook").value,
    pureName: removeAccents(ev.target.querySelector("#nameBook").value).toLowerCase()
  }
  data.addBook(book);
  const tableBody = document.querySelector("#searchRes tbody");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td colspan="2">${book.name}</td>
    <td>${book.author}</td>
    <td>${book.topic}</td>
    <td><a class="deleteLink">Delete</a></td>
    `;
  tableBody.appendChild(row);
  setEventOpenModalForTable();
  document.querySelector("#addBookModalOverlay").style.visibility = "hidden";
})
// -----------------add book--------------------------
// delete book
document.querySelector("#deleteBookModalOverlay #deleteBut").addEventListener("click", function (ev) {
  ev.preventDefault();
  ev.stopPropagation();
  const markedTag = document.querySelector(".deleteName")
  document.querySelector("#searchRes tbody").deleteRow(parseInt(markedTag.getAttribute("id")) - 1)
  data.deleteBook(markedTag.textContent);
  document.querySelector("#deleteBookModalOverlay").style.visibility = "hidden";
})
// -----------------delete book--------------------------


