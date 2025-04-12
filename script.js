const mainElement = document.querySelector("body");
const formElement = document.querySelector("#newBookForm");
const bookContainer = document.querySelector(".book-container");
const newBookModal = document.querySelector("#newBookModal");
const tableHead = document.querySelector(".table-head");
const library = [];

class Book {
  static toggleReadStatus(bookId) {
    let book = library.find((book) => book.id == bookId);
    book.isRead = this.isRead ? false : true;
  }

  static addALotOfBooksToThePage() {
    Library.addBook("The Great Gatsby", "F. Scott Fitzgerald", "Fiction", 218);
    Library.addBook("To Kill a Mockingbird", "Harper Lee", "Fiction", 281);
    Library.addBook("1984", "George Orwell", "Dystopian", 328);
    Library.addBook("Moby-Dick", "Herman Melville", "Adventure", 635);
    Library.addBook("Pride and Prejudice", "Jane Austen", "Romance", 279);
    Library.addBook("The Catcher in the Rye", "J.D. Salinger", "Fiction", 277);
    Library.addBook("The Hobbit", "J.R.R. Tolkien", "Fantasy", 310);
    Library.addBook("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", "Fantasy", 309);
    Library.addBook("The Hunger Games", "Suzanne Collins", "Dystopian", 374);
    Library.addBook("The Da Vinci Code", "Dan Brown", "Mystery", 454);
    Library.addBook("The Alchemist", "Paulo Coelho", "Adventure", 208);
    Library.addBook("The Fault in Our Stars", "John Green", "Young Adult", 313);
    Library.addBook("The Chronicles of Narnia", "C.S. Lewis", "Fantasy", 778);
    Library.addBook("The Lord of the Rings", "J.R.R. Tolkien", "Fantasy", 1178);
    Library.addBook("A Game of Thrones", "George R.R. Martin", "Fantasy", 694);
    Library.addBook("The Shining", "Stephen King", "Horror", 659);
    Library.addBook("The Book Thief", "Markus Zusak", "Historical Fiction", 584);
    Library.addBook("The Girl on the Train", "Paula Hawkins", "Thriller", 395);
    Library.addBook("Gone Girl", "Gillian Flynn", "Thriller", 432);
    Library.addBook("Catch-22", "Joseph Heller", "Satire", 453);
    Library.addBook("Brave New World", "Aldous Huxley", "Dystopian", 311);
    Library.addBook("The Road", "Cormac McCarthy", "Post-apocalyptic", 287);
    Library.addBook("The Giver", "Lois Lowry", "Dystopian", 179);
    Library.addBook("The Secret Garden", "Frances Hodgson Burnett", "Children's", 331);
    Library.addBook("The Help", "Kathryn Stockett", "Historical Fiction", 522);
    Library.addBook("A Tale of Two Cities", "Charles Dickens", "Historical Fiction", 489);
    Library.addBook("The Outsiders", "S.E. Hinton", "Young Adult", 192);
    Library.addBook("The Night Circus", "Erin Morgenstern", "Fantasy", 387);
    Library.addBook("Little Women", "Louisa May Alcott", "Fiction", 759);
    Library.addBook("Fifty Shades of Grey", "E.L. James", "Romance", 514);
    Library.addBook("The Kite Runner", "Khaled Hosseini", "Historical Fiction", 371);
  }

  constructor(title, author, genre, pageCount, read = false) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pageCount = pageCount;
    this.dateAdded = dayjs();
    this.id = crypto.randomUUID();
    this.isRead = read;
  }
}

class Library {
  static addBook(title, author, genre, pageCount) {
    library.push(
      new Book(
        WebForm.sanitizeText(title),
        WebForm.sanitizeText(author),
        WebForm.sanitizeText(genre),
        pageCount
      )
    );
  }

  static removeBook(bookId) {
    let bookIndex = library.findIndex((book) => book.id == bookId);
    library.splice(bookIndex, 1);
  }

  constructor() {}
}

const convertDateToFriendlyDate = function convertDateToFriendlyDate(date) {
  return date.format("DD/MM/YYYY");
};

class WebForm {
  static clearAllBooksFromPage() {
    while (bookContainer.firstChild) {
      bookContainer.removeChild(bookContainer.lastChild);
    }
  }

  static addBooksInLibraryToPage() {
    WebForm.clearAllBooksFromPage();
    WebForm.addTableHeaderToPage();
    library.forEach((book) => WebForm.addABookToPage(book));
  }

  static addABookToPage(book) {
    //let booksPositionInArray = library.findIndex((b) => b.title === `${book.title}`);
    let readIcon = book.isRead ? "img/eye-check-outline.svg" : "img/eye-remove-outline.svg";
    const friendlyDate = convertDateToFriendlyDate(book.dateAdded);
    const bookElement = document.createElement("tr");
    bookElement.classList.add("book");
    bookElement.dataset.id = book.id;
    bookElement.innerHTML = `
    <td>${WebForm.appendLongNames(book.title)}</td>
    <td>${WebForm.appendLongNames(book.author)}</td>
    <td>${book.genre}</td>
    <td class="number">${book.pageCount}</td>
    <td class="number">${friendlyDate}</td>
    <img class="svg read-btn ${book.isRead}" src=${readIcon}>
    <img class="svg delete-btn" src="img/book-remove.svg">
    `;
    bookContainer.appendChild(bookElement);
  }

  static addTableHeaderToPage() {
    const tableHeadEl = document.createElement("tr");
    tableHeadEl.classList.add("table-head");
    tableHeadEl.innerHTML = `
    <td>Title</td>
    <td>Author</td>
    <td>Genre</td>
    <td class="number">Page Count</td>
    <td class="number">Date Added</td>
    <td>&nbsp;</td>
    `;
    bookContainer.appendChild(tableHeadEl);
  }

  static sanitizeText(string) {
    var temp = document.createElement("div");
    temp.textContent = string;
    return temp.innerHTML;
  }

  static bookFormSubmit(event) {
    let titleSubmit = document.getElementsByName("title")[0].value;
    let authorSubmit = document.getElementsByName("author")[0].value;
    let genreSubmit = document.getElementsByName("genre")[0].value;
    let pageCountSubmit = document.getElementsByName("page-count")[0].value;

    Library.addBook(titleSubmit, authorSubmit, genreSubmit, pageCountSubmit);
    WebForm.addBooksInLibraryToPage();
  }

  static appendLongNames(name) {
    if (name.length <= 16) {
      return name;
    }
    let shortName = name.substring(0, 13) + "...";
    return shortName;
  }

  constructor() {}
}

document.addEventListener("DOMContentLoaded", () => {
  WebForm.addBooksInLibraryToPage();

  formElement.addEventListener("submit", (e) => {
    WebForm.bookFormSubmit(e);
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
      let bookId = e.target.parentElement.dataset.id;
      Library.removeBook(bookId);
      WebForm.addBooksInLibraryToPage();
    }

    if (e.target.classList.contains("read-btn")) {
      let bookId = e.target.parentElement.dataset.id;
      Book.toggleReadStatus(bookId);
      WebForm.addBooksInLibraryToPage();
    }
  });
});

Book.addALotOfBooksToThePage();
