const mainElement = document.querySelector("body");
const formElement = document.querySelector("#newBookForm");
const openModalButton = document.querySelector(".open-modal");
const closeModalButton = document.querySelector(".close-modal");
const bookContainer = document.querySelector(".book-container");
const newBookModal = document.querySelector("#newBookModal");
const tableHead = document.querySelector(".table-head");
const library = [];
let bookId = 0;

function Book(title, author, genre, pageCount) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pageCount = pageCount;
  this.dateAdded = dayjs();
  this.id = bookId;
  bookId++;
}

function convertDateToFriendlyDate(date) {
  return date.format("DD/MM/YYYY");
}

function formValidator(title, author, genre, pageCount) {
  if (title === "" || author === "" || genre === "" || isNaN(pageCount)) {
    return false;
  } else return true;
}

function addBookToLibrary(title, author, genre, pageCount) {
  library.push(new Book(title, author, genre, pageCount));
}

function bookFormSubmit(event) {
  let titleSubmit = document.getElementsByName("title")[0].value;
  let authorSubmit = document.getElementsByName("author")[0].value;
  let genreSubmit = document.getElementsByName("genre")[0].value;
  let pageCountSubmit = document.getElementsByName("page-count")[0].value;

  if (formValidator(titleSubmit, authorSubmit, genreSubmit, pageCountSubmit)) {
    addBookToLibrary(titleSubmit, authorSubmit, genreSubmit, pageCountSubmit);
  }
  addBooksInLibraryToPage();
}

function addTableHeaderToPage() {
  const tableHeadEl = document.createElement("tr");
  tableHeadEl.classList.add("table-head");
  tableHeadEl.innerHTML = `
  <td>title</td>
  <td>author</td>
  <td>genre</td>
  <td class="number">page-count</td>
  <td class="number">date-added</td>
  <td>&nbsp;</td>
  `;
  bookContainer.appendChild(tableHeadEl);
}

function addABookToPage(book) {
  const friendlyDate = convertDateToFriendlyDate(book.dateAdded);
  const bookElement = document.createElement("tr");
  bookElement.classList.add("book");
  bookElement.dataset.id = book.id;
  bookElement.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.genre}</td>
  <td class="number">${book.pageCount}</td>
  <td class="number">${friendlyDate}</td>
  <td>delete</td>
  `;
  bookContainer.appendChild(bookElement);
}

function addBooksInLibraryToPage() {
  clearAllBooksFromPage();
  addTableHeaderToPage();
  library.forEach((book) => addABookToPage(book));
}

function clearAllBooksFromPage() {
  while (bookContainer.firstChild) {
    bookContainer.removeChild(bookContainer.lastChild);
  }
}

function buttonPressed(target) {
  let classList = target.classList;
  if (classList.contains("open-modal")) {
    newBookModal.showModal();
  }
  if (classList.contains("close-modal")) {
    newBookModal.close();
  }
}
document.addEventListener("DOMContentLoaded", () => {
  mainElement.addEventListener("click", (e) => {
    buttonPressed(e.target);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  formElement.addEventListener("submit", (e) => {
    //e.preventDefault();
    bookFormSubmit(e);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  addBooksInLibraryToPage();
});

addBookToLibrary("mistborn", "sanderson", "fantasy", "1300");
addBookToLibrary("wheel o' time", "robbie jordo", "fantasy", "800");
addBookToLibrary("gardens of moon", "erikson", "fantasy", "1200");
