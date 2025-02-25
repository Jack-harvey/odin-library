const mainElement = document.querySelector("body");
const formElement = document.querySelector("#newBookForm");
const openModalButton = document.querySelector(".open-modal");
const closeModalButton = document.querySelector(".close-modal");
const bookContainer = document.querySelector(".book-container");
const newBookModal = document.querySelector("#newBookModal");
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

function addBookToLibrary(title, author, genre, pageCount) {
  library.push(new Book(title, author, genre, pageCount));
}

function convertDateToFriendlyDate(date) {
  return date.format("DD/MM/YYYY");
}
function convertDateToFriendlyTime(date) {
  return date.format("HH:mm:ss");
}

function formValidator(title, author, genre, pageCount) {
  if (title === "" || author === "" || genre === "" || isNaN(pageCount)) {
    return false;
  } else return true;
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

function buttonPressed(target) {
  let classList = target.classList;
  if (classList.contains("open-modal")) {
    newBookModal.showModal();
  }
  if (classList.contains("close-modal")) {
    newBookModal.close();
  }
}

function clearAllBooksFromPage() {
  while (bookContainer.firstChild) {
    bookContainer.removeChild(bookContainer.lastChild);
  }
}

function addABookToPage(book) {
  const friendlyDate = convertDateToFriendlyDate(book.dateAdded);
  const friendlyTime = convertDateToFriendlyTime(book.dateAdded);
  const bookElement = document.createElement("div");
  bookElement.classList.add("book");
  bookElement.innerHTML = `
  <span class="title">${book.title}</span>
  <span class="author">${book.author}</span>
  <span class="genre">${book.genre}</span>
  <span class="page-count">${book.pageCount}</span>
          <div class="date-time">
            <span class="date-added">${friendlyDate}</span>
            <span class="time-added">${friendlyTime}</span>
          </div>
  <button>delete</button>
  `;
  bookContainer.appendChild(bookElement);
}

function addBooksInLibraryToPage() {
  clearAllBooksFromPage();
  library.forEach((book) => addABookToPage(book));
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

addBookToLibrary("mistborn", "sanderson", "fantasy", "1300");
addBookToLibrary("wheel o' time", "robbie jordo", "fantasy", "800");
addBookToLibrary("gardens of moon", "erikson", "fantasy", "1200");
