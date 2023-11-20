let books = [];

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
            books = await getBooks();
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

    const populateEditBookForm = (book) => {
        const form = document.getElementById("add-book-form");
        form.title.value = book.title;
        form.author.value = book.author;
        form.genre.value = book.genre;
        form.publicationYear.value = book.publicationYear;
        form.description.value = book.description;

        const reviewSection = document.getElementById("review-boxes");
        reviewSection.innerHTML = "";
        book.reviews.forEach((review) => {
            const input = document.createElement("input");
            input.type = "text";
            input.value = review;
            reviewSection.appendChild(input);
        });

        form._id.value = book._id;
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

        const eLinkBook = document.createElement("a");
        eLinkBook.innerHTML = "&#9998;";
        eLinkBook.style.cursor = "pointer";
        bookDetails.appendChild(eLinkBook);
        eLinkBook.id = "edit-link-book";

        const dLinkBook = document.createElement("a");
        dLinkBook.innerHTML = "&times;";
        dLinkBook.id = "delete-link-book";
        dLinkBook.style.fontSize = "24px";
        dLinkBook.style.cursor = "pointer";
        bookDetails.appendChild(dLinkBook);
        dLinkBook.id = "delete-link-book";

        eLinkBook.onclick = (e) => {
            e.preventDefault();
            document.querySelector(".dialog").classList.remove("transparent");
            document.getElementById("add-edit-title").innerHTML = "Edit Book";
            populateEditBookForm(book);
        };
        dLinkBook.onclick = (e) => {
            e.preventDefault();
            deleteBook(book);
        };
        console.log("Full Book Details:", book);
    };


    const showSuccessMessage = (message) => {
        const successMessage = document.getElementById("success-message");
        successMessage.textContent = message;

        successMessage.style.display = "block";

        setTimeout(() => {
            successMessage.style.display = "none";
        }, 3000);
    };
    const showErrorMessage = (message) => {
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = message;

        errorMessage.style.display = "block";

        setTimeout(() => {
            errorMessage.style.display = "none";
        }, 5000);
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

        if (form._id.value !== "-1") {
            const editedBook = {
                _id: form._id.value,
                title: formData.get("title"),
                author: formData.get("author"),
                genre: formData.get("genre"),
                publicationYear: formData.get("publicationYear"),
                description: formData.get("description"),
                reviews: getReviews(),
            };

            try {
                const response = await fetch(`/api/books/${editedBook._id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editedBook),
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    console.error("Error updating book:", errorMessage);
                    showErrorMessage(`Error updating book: ${errorMessage}`);
                    return;
                }

                showBooks();
                displayDetailsBook(editedBook);

                document.querySelector(".dialog").classList.add("transparent");

                showSuccessMessage("Book edited successfully!");
            } catch (error) {
                console.error("Error updating book:", error);
                showErrorMessage(`Error updating book: ${error.message}`);
            }
        } else {
            formData.delete("_id");
            formData.append("reviews", getReviews());

            try {
                const response = await fetch("/api/books", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    console.error("Error posting data:", errorMessage);
                    showErrorMessage(`Error posting data: ${errorMessage}`);
                    return;
                }

                resetForm();
                document.querySelector(".dialog").classList.add("transparent");
                showBooks();
                showSuccessMessage("Book added successfully!");
            } catch (error) {
                console.error("Error posting data:", error);
                showErrorMessage(`Error posting data: ${error.message}`);
            }
        }
    };

    const deleteBook = async (book) => {
        const isConfirmed = confirm(`Are you sure you want to delete the book "${book.title}"?`);

        if (!isConfirmed) {
            return;
        }

        try {
            const response = await fetch(`/api/books/${book._id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error("Error deleting book:", errorMessage);
                showErrorMessage(`Error deleting book: ${errorMessage}`);
                return;
            }

            showBooks();

            const bookDetails = document.getElementById("book-details");
            bookDetails.innerHTML = "";

            showSuccessMessage("Book deleted successfully!");
        } catch (error) {
            console.error("Error deleting book:", error);
            showErrorMessage(`Error deleting book: ${error.message}`);
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