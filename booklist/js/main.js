// Book Constructor
function Book(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

//UI Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function (book) {
  const list = document.querySelector("#book-list")
  //Create tr element
  const row = document.createElement("tr")
  //insert cols
  row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class='delete'>X</a></td>

    `
  list.appendChild(row)
}

// Show alert
UI.prototype.showAlert = function (message, className) {
  // create div
  const div = document.createElement("div")
  //add classes
  div.className = `alert ${className}`
  // Add text
  div.appendChild(document.createTextNode(message))
  //get parent
  const container = document.querySelector(".container")
  //get form
  const form = document.querySelector("#book-form")

  //insert alert
  container.insertBefore(div, form)

  //timeout
  setTimeout(function () {
    document.querySelector(".alert").remove()
  }, 3000)
}

//Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove()
  }
}

//Clear fields
UI.prototype.clearFields = function () {
  document.querySelector("#title").value = ""
  document.querySelector("#author").value = ""
  document.querySelector("#isbn").value = ""
}

//event Listeners
document.querySelector("#book-form").addEventListener("submit", function (e) {
  //   console.log("test")
  //get form values
  const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value
  //   console.log(title, author, isbn)

  //Instantiate book
  const book = new Book(title, author, isbn)

  //Instantiate UI
  const ui = new UI()

  // Validate
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields", "error")
  } else {
    // Add book to list
    ui.addBookToList(book)

    //show success
    ui.showAlert("Book Added!", "success")

    //clear input fields
    ui.clearFields()
  }

  //   console.log(book)
  e.preventDefault()
})

//event listener for delete
document.querySelector("#book-list").addEventListener("click", function (e) {
  //Instantiate UI
  const ui = new UI()

  ui.deleteBook(e.target)

  //show alert
  ui.showAlert("Book has been removed", "success")
  e.preventDefault()
})
