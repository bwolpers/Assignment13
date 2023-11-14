document.addEventListener("DOMContentLoaded", () => {
  let selectedBook = null;

  const getBooks = async () => {
      try {
          const response = await fetch("/api/books");
          if (!response.ok) {
              throw new Error("Failed to fetch books");
          }
          return response.json();
      } catch (error) {
          console.error(error);
      }
  };

  const resetBooks = async () => {
      try {
          const response = await fetch("/api/books/", {
              method: "DELETE",
          });

          if (!response.ok) {
              throw new Error("Error resetting books");
          }

          showBooks();
      } catch (error) {
          console.error("Error resetting books:", error);
      }
  };

  const getReviews = () => {
      const inputs = document.querySelectorAll("#review-boxes input");
      return Array.from(inputs).map((input) => input.value);
  };

  const showBooks = async () => {
      try {
          const books = await getBooks();
          const booksDiv = document.getElementById("book-list");
          booksDiv.innerHTML = "";

          books.forEach((book) => {
              const section = document.createElement("section");
              section.classList.add("book");
              booksDiv.appendChild(section);

              const a = document.createElement("a");
              a.href = "#";
              section.appendChild(a);

              const h3 = document.createElement("h3");
              h3.innerHTML = book.title;
              a.appendChild(h3);

              a.onclick = (e) => {
                  e.preventDefault();
                  if (selectedBook) {
                      selectedBook.h3.style.opacity = 0.5;
                  }

                  const isSelected = a.classList.toggle("selected");

                  if (isSelected) {
                      selectedBook = { a, h3 };
                  } else {
                      selectedBook = null;
                  }

                  displayDetailsBook(book);
              };
          });
      } catch (error) {
          console.error("Error fetching books:", error);
      }
  };

  const displayDetailsBook = (book) => {
      const bookDetails = document.getElementById("book-details");
      bookDetails.innerHTML = "";

      const h3 = document.createElement("h3");
      h3.innerHTML = book.title;
      bookDetails.appendChild(h3);

      const pAuthor = document.createElement("p");
      pAuthor.innerHTML = `Author: ${book.author}`;
      bookDetails.appendChild(pAuthor);

      const pGenre = document.createElement("p");
      pGenre.innerHTML = `Genre: ${book.genre}`;
      bookDetails.appendChild(pGenre);

      const pPublished = document.createElement("p");
      pPublished.innerHTML = `Published: ${book.publicationYear}`;
      bookDetails.appendChild(pPublished);

      const p = document.createElement("p");
      p.innerHTML = book.description;
      bookDetails.appendChild(p);

      const h3Reviews = document.createElement("h3");
      h3Reviews.innerHTML = "Reviews";
      bookDetails.appendChild(h3Reviews);

      const ulReviews = document.createElement("ul");
      bookDetails.appendChild(ulReviews);

      book.reviews.forEach((review) => {
          const li = document.createElement("li");
          li.innerHTML = review;
          ulReviews.appendChild(li);
      });
  };

  const addBook = async (e) => {
      e.preventDefault();
      const form = document.getElementById("add-book-form");
      const formData = new FormData(form);

      const publicationYear = formData.get("publicationYear");
      if (isNaN(publicationYear)) {
          console.log("Publication Year must be a number");
          return;
      }

      if (form._id.value == -1) {
          formData.delete("_id");
          formData.append("reviews", getReviews());

          try {
              const response = await fetch("/api/books", {
                  method: "POST",
                  body: formData,
              });

              if (!response.ok) {
                  console.log("Error posting data");
                  return;
              }

              const responseData = await response.json();
              resetForm();
              document.querySelector(".dialog").classList.add("transparent");
              showBooks();
          } catch (error) {
              console.error("Error posting data:", error);
          }
      }
  };

  const resetForm = () => {
      const form = document.getElementById("add-book-form");
      form.reset();
      form._id = "-1";
      document.getElementById("review-boxes").innerHTML = "";
  };

  const showHideAdd = (e) => {
      e.preventDefault();
      document.querySelector(".dialog").classList.remove("transparent");
      resetForm();
  };

  const addReview = (e) => {
      e.preventDefault();
      const section = document.getElementById("review-boxes");
      const input = document.createElement("input");
      input.type = "text";
      section.appendChild(input);
  };

  showBooks();
  document.getElementById("add-book-form").addEventListener("submit", addBook);
  document.getElementById("add-review").addEventListener("click", addReview);
});
