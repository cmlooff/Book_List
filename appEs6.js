class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    // Create table row (tr) element
    const row = document.createElement('tr');
    // Insert columns
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
    `;
    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create Div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add Text
    div.appendChild(document.createTextNode(message));
    // Get Parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert Alert
    container.insertBefore(div, form) //* Insert div before form

    // Timeout after three seconds
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
      // going from the a href -> td -> tr
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

//// Local Storage Class
class Store {
  static getBooks() { // Fetching books from local storage
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
      // Transform books into a JS object
    }
    return books;
  }

  static displayBooks() {

  }

  static addBook() {

  }

  static removeBook() {

  }
}

//// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
  // Get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value

  // Instantiating Book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate 
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error') // Class of Error (html)
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add to LS
    Store.addBook(book);

    // Show success
    ui.showAlert('Book Added!', 'success')

    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

//// Event listener for Delete
document.getElementById('book-list').addEventListener('click', function (e) {
  const ui = new UI(); //* Instantiate UI

  // Delete book
  ui.deleteBook(e.target);

  // Show  message
  ui.showAlert('Book Removed!', 'success')

  e.preventDefault();
})