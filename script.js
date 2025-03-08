const mainElement = document.querySelector("body");
const formElement = document.querySelector("#newBookForm");
const bookContainer = document.querySelector(".book-container");
const newBookModal = document.querySelector("#newBookModal");
const tableHead = document.querySelector(".table-head");
const library = [];

const Book = function (title, author, genre, pageCount, read = false) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pageCount = pageCount;
  this.dateAdded = dayjs();
  this.id = crypto.randomUUID();
  this.isRead = read;
};

const convertDateToFriendlyDate = function convertDateToFriendlyDate(date) {
  return date.format("DD/MM/YYYY");
};

const addBookToLibrary = function (title, author, genre, pageCount) {
  library.push(
    new Book(
      sanitizeText(title),
      sanitizeText(author),
      sanitizeText(genre),
      pageCount
    )
  );
};

const removeBookFromLibrary = function (arrayPosition) {
  library.splice(arrayPosition, 1);
};

const toggleReadStatus = function (arrayPosition) {
  library[arrayPosition].isRead = library[arrayPosition].isRead ? false : true;
};

const appendLongNames = function (name) {
  if (name.length <= 16) {
    return name;
  }
  shortName = name.substring(0, 13) + "...";
  return shortName;
};

const bookFormSubmit = function (event) {
  let titleSubmit = document.getElementsByName("title")[0].value;
  let authorSubmit = document.getElementsByName("author")[0].value;
  let genreSubmit = document.getElementsByName("genre")[0].value;
  let pageCountSubmit = document.getElementsByName("page-count")[0].value;

  addBookToLibrary(titleSubmit, authorSubmit, genreSubmit, pageCountSubmit);
  addBooksInLibraryToPage();
};

const sanitizeText = function (string) {
  var temp = document.createElement("div");
  temp.textContent = string;
  return temp.innerHTML;
};

const addTableHeaderToPage = function () {
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
};

const addABookToPage = function (book) {
  let booksPositionInArray = library.findIndex(
    (b) => b.title === `${book.title}`
  );
  let readIcon = book.isRead
    ? "img/eye-check-outline.svg"
    : "img/eye-remove-outline.svg";
  const friendlyDate = convertDateToFriendlyDate(book.dateAdded);
  const bookElement = document.createElement("tr");
  bookElement.classList.add("book");
  bookElement.dataset.arrayPosition = booksPositionInArray;
  bookElement.innerHTML = `
  <td>${appendLongNames(book.title)}</td>
  <td>${appendLongNames(book.author)}</td>
  <td>${book.genre}</td>
  <td class="number">${book.pageCount}</td>
  <td class="number">${friendlyDate}</td>
  <img class="svg read-btn ${book.isRead}" src=${readIcon}>
  <img class="svg delete-btn" src="img/book-remove.svg">
  `;
  bookContainer.appendChild(bookElement);
};

const addBooksInLibraryToPage = function () {
  clearAllBooksFromPage();
  addTableHeaderToPage();
  library.forEach((book) => addABookToPage(book));
};

const clearAllBooksFromPage = function () {
  while (bookContainer.firstChild) {
    bookContainer.removeChild(bookContainer.lastChild);
  }
};

const addALotOfBooksToThePage = function () {
  addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", "Fiction", 218);
  addBookToLibrary("To Kill a Mockingbird", "Harper Lee", "Fiction", 281);
  addBookToLibrary("1984", "George Orwell", "Dystopian", 328);
  addBookToLibrary("Moby-Dick", "Herman Melville", "Adventure", 635);
  addBookToLibrary("Pride and Prejudice", "Jane Austen", "Romance", 279);
  addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", "Fiction", 277);
  addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "Fantasy", 310);
  addBookToLibrary(
    "Harry Potter and the Sorcerer's Stone",
    "J.K. Rowling",
    "Fantasy",
    309
  );
  addBookToLibrary("The Hunger Games", "Suzanne Collins", "Dystopian", 374);
  addBookToLibrary("The Da Vinci Code", "Dan Brown", "Mystery", 454);
  addBookToLibrary("The Alchemist", "Paulo Coelho", "Adventure", 208);
  addBookToLibrary("The Fault in Our Stars", "John Green", "Young Adult", 313);
  addBookToLibrary("The Chronicles of Narnia", "C.S. Lewis", "Fantasy", 778);
  addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", "Fantasy", 1178);
  addBookToLibrary("A Game of Thrones", "George R.R. Martin", "Fantasy", 694);
  addBookToLibrary("The Shining", "Stephen King", "Horror", 659);
  addBookToLibrary("The Book Thief", "Markus Zusak", "Historical Fiction", 584);
  addBookToLibrary("The Girl on the Train", "Paula Hawkins", "Thriller", 395);
  addBookToLibrary("Gone Girl", "Gillian Flynn", "Thriller", 432);
  addBookToLibrary("Catch-22", "Joseph Heller", "Satire", 453);
  addBookToLibrary("Brave New World", "Aldous Huxley", "Dystopian", 311);
  addBookToLibrary("The Road", "Cormac McCarthy", "Post-apocalyptic", 287);
  addBookToLibrary("The Giver", "Lois Lowry", "Dystopian", 179);
  addBookToLibrary(
    "The Secret Garden",
    "Frances Hodgson Burnett",
    "Children's",
    331
  );
  addBookToLibrary("The Help", "Kathryn Stockett", "Historical Fiction", 522);
  addBookToLibrary(
    "A Tale of Two Cities",
    "Charles Dickens",
    "Historical Fiction",
    489
  );
  addBookToLibrary("The Outsiders", "S.E. Hinton", "Young Adult", 192);
  addBookToLibrary("The Night Circus", "Erin Morgenstern", "Fantasy", 387);
  addBookToLibrary("Little Women", "Louisa May Alcott", "Fiction", 759);
  addBookToLibrary("Fifty Shades of Grey", "E.L. James", "Romance", 514);
  addBookToLibrary(
    "The Kite Runner",
    "Khaled Hosseini",
    "Historical Fiction",
    371
  );
};

document.addEventListener("DOMContentLoaded", () => {
  addBooksInLibraryToPage();

  formElement.addEventListener("submit", (e) => {
    bookFormSubmit(e);
    formElement.reset();
  });

  mainElement.addEventListener("click", (e) => {
    let classList = e.target.classList;

    if (classList.contains("open-modal")) {
      newBookModal.showModal();
    }
    if (classList.contains("close-modal")) {
      newBookModal.close();
      formElement.reset();
    }
  });

  bookContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      let bookToRemove = e.target.parentElement.dataset.arrayPosition;
      removeBookFromLibrary(bookToRemove);
      addBooksInLibraryToPage();
    }

    if (e.target.classList.contains("read-btn")) {
      let bookToRemove = e.target.parentElement.dataset.arrayPosition;
      toggleReadStatus(bookToRemove);
      addBooksInLibraryToPage();
    }
  });
});

addALotOfBooksToThePage();
