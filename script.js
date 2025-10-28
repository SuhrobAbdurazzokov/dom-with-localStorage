let books = [];
let editId = null;

const bookForm = document.getElementById("bookForm");
const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const bookList = document.getElementById("bookList");
const addBtn = document.getElementById("addBtn");
const cancelBtn = document.getElementById("cancelBtn");

bookForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = bookTitle.value.trim();
    const author = bookAuthor.value.trim();

    if (!title || !author) return alert("Barcha maydonlarni to'ldiring");

    if (editId) {
        // Yangilash
        const book = books.find((b) => b.id === editId);
        book.title = title;
        book.author = author;
        editId = null;
        addBtn.textContent = "Qo'shish";
        cancelBtn.style.display = "none";
        alert("Kitob ma'lumotlari muvaffaqiyatli yangilandi!");
    } else {
        books.push({ id: Date.now(), title, author });
        alert("Yangi kitob muvaffaqiyatli qo'shildi!");
    }

    saveBooks();
    displayBooks();
    bookForm.reset();
});

function displayBooks() {
    bookList.innerHTML = "";
    if (books.length === 0) {
        bookList.innerHTML = `<tr><td colspan="4" style="text-align:center;color:#888;">📭 Ro'yxat bo'sh</td></tr>`;
        return;
    }

    books.forEach((book, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${index + 1}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>
        <button class="edit" onclick="editBook(${book.id})">✏️</button>
        <button class="delete" onclick="deleteBook(${book.id})">🗑️</button>
      </td>
    `;
        bookList.appendChild(row);
    });
}

function editBook(id) {
    const book = books.find((b) => b.id === id);
    if (!book) return;

    bookTitle.value = book.title;
    bookAuthor.value = book.author;
    editId = id;
    addBtn.textContent = "Save";
    cancelBtn.style.display = "inline-block";
}

cancelBtn.addEventListener("click", () => {
    editId = null;
    bookForm.reset();
    addBtn.textContent = "Qo'shish";
    cancelBtn.style.display = "none";
});

function deleteBook(id) {
    if (confirm("Ushbu kitobni o'chirishni xohlaysizmi?")) {
        books = books.filter((b) => b.id !== id);
        saveBooks();
        displayBooks();
        alert("🗑️ Kitob o'chirildi!");
    }
}

function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

function loadBooks() {
    const data = localStorage.getItem("books");
    if (data) books = JSON.parse(data);
}

window.addEventListener("DOMContentLoaded", () => {
    loadBooks();
    displayBooks();
});
