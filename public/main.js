(function () {
  "use strict";

  let bookContainer = document.querySelector(".books");
  let bookButton = document.querySelector(".book-btn");
  const bookTitle = document.getElementById("bookTitle");
  const bookGenre = document.getElementById("genre");
  const bookAuthor = document.getElementById("author");
  const bookPages = document.getElementById("pages");
  const radioButtons = document.querySelectorAll('input[name="exampleRadios"]');
  const addButton = document.querySelector(".add");
  const formButton = document.querySelector(".form-btn");

  let myLibrary = [];
  let card = [];
  let cardBody = [];
  let header = [];
  let paragraphs = [];
  let anchs = [];
  let removeBook = [];
  let rows = [];

  function Book(title, genre, author, pages, read) {
    this.title = title;
    this.genre = genre;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  formButton.addEventListener("click", () => {
    let read;
    for (const element of radioButtons) {
      if (element.checked) {
        if (element.value === "True") read = true;
        else read = false;
      }
    }

    let title = bookTitle.value;
    let genre = bookGenre.value;
    let author = bookAuthor.value;
    let pages = parseInt(bookPages.value);
    let book = new Book(title, genre, author, pages, read);
    myLibrary.push(book);

    render();

    let interval = setTimeout(() => {
      addButton.click();
    }, 500);
  });

  function toggleRead() {
    for (let i = 0; i < anchs.length; i++) {
      anchs[i].addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        if (myLibrary[i].read === true) {
          myLibrary[i].read = false;
          anchs[i].innerText = `No, I haven't read this`;
        } else {
          myLibrary[i].read = true;
          anchs[i].innerText = `Yes! I've read this`;
        }
        console.log(myLibrary[i].read);
      });
    }
  }

  function deleteBook() {
    for (let i = 0; i < removeBook.length; i++) {
      removeBook[i].addEventListener("click", dBooks);
    }
  }

  function dBooks() {
    myLibrary.splice(this.value, 1);
    bookContainer.removeChild(card[this.value]);
    console.log(myLibrary);
    if (myLibrary.length === 1) {
      myLibrary = [];
    }
  }

  function render() {
    let length = myLibrary.length;
    const row = document.createElement("div");
    const col = document.createElement("div");
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const p = document.createElement("p");
    const anchor = document.createElement("a");
    const rAnchor = document.createElement("button");
    const h5 = document.createElement("h5");

    for (let i = card.length; i < length; i++) {
      card.push(div);
      cardBody.push(div2);
      header.push(h5);
      anchs.push(anchor);
      removeBook.push(rAnchor);
      paragraphs.push(p);
    }

    for (let i = 0; i < myLibrary.length; i++) {
      card[i].classList.add(
        "card",
        "text-center",
        "bg-secondary",
        "text-light"
      );
      cardBody[i].classList.add(
        "card-body",
        "d-flex",
        "flex-column",
        "justify-content-center"
      );
      header[i].classList.add("card-title");
      header[i].innerText = `${myLibrary[i].title}`;
      paragraphs[i].classList.add("card-text");
      paragraphs[i].innerText = `${myLibrary[i].genre}`;
      anchs[i].classList.add(
        "btn",
        "btn-primary",
        "btn-sm",
        "align-self-center",
        "bg-warning"
      );
      anchs[i].setAttribute("href", "#bookContainer");
      removeBook[i].classList.add(
        "btn",
        "btn-primary",
        "btn-sm",
        "align-self-center",
        "bg-warning",
        "mt-4"
      );
      removeBook[i].setAttribute("href", "#bookContainer");
      removeBook[i].setAttribute("value", `${i}`);
      removeBook[i].innerText = "Remove Book";
      if (myLibrary[i].read === true)
        anchs[i].innerText = `Yes! I've read this`;
      else anchs[i].innerText = `No, I haven't read this`;
    }

    toggleRead();
    deleteBook();
    appendElements();
    console.log(myLibrary);
  }

  function appendElements() {
    for (let i = 0; i < myLibrary.length; i++) {
      cardBody[i].append(header[i]);
      cardBody[i].append(paragraphs[i]);
      cardBody[i].append(anchs[i]);
      cardBody[i].append(removeBook[i]);
      card[i].append(cardBody[i]);
      bookContainer.append(card[i]);
    }
  }
})();
