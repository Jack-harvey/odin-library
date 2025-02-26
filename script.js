const mainElement = document.querySelector("body");
const toolbarEl = document.querySelector("toolbar");
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

function removeBookFromLibrary(id) {
  library.splice(id, 1);
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
  <td class="number">pageCount</td>
  <td class="number">dateAdded</td>
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
  <img class="svg delete-btn" src="img/book-remove.svg">
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

document.addEventListener("DOMContentLoaded", () => {
  addBooksInLibraryToPage();

  formElement.addEventListener("submit", (e) => {
    bookFormSubmit(e);
  });

  toolbarEl.addEventListener("click", (e) => {
    let classList = e.target.classList;

    if (classList.contains("open-modal")) {
      newBookModal.showModal();
    }
    if (classList.contains("close-modal")) {
      newBookModal.close();
    }
  });

  bookContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      let bookToRemove = e.target.parentElement.dataset.id;
      removeBookFromLibrary(bookToRemove);
      addBooksInLibraryToPage();
    }
  });
});

addBookToLibrary("mistborn", "sanderson", "fantasy", "1300");
addBookToLibrary("wheel o' time", "robbie jordo", "fantasy", "800");
addBookToLibrary("gardens of moon", "erikson", "fantasy", "1200");
