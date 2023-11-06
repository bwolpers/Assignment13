const showBooks = async () => {
  const fetchedBooks = await getBooks();
  const container = document.getElementById('book-container');

  if (!fetchedBooks) {
    console.error('Invalid JSON');
    return;
  }

  fetchedBooks.forEach((book) => {
    const bookElement = document.createElement('div');
    container.appendChild(bookElement);

    const h2 = document.createElement('h2');
    h2.innerHTML = book.title;
    bookElement.appendChild(h2);

    const pAuthor = document.createElement('p');
    pAuthor.innerHTML = `Author: ${book.author}`;
    bookElement.appendChild(pAuthor);

    const pGenre = document.createElement('p');
    pGenre.innerHTML = `Genre: ${book.genre}`;
    bookElement.appendChild(pGenre);

    const pPublished = document.createElement('p');
    pPublished.innerHTML = `Published: ${book.publicationYear}`;
    bookElement.appendChild(pPublished);

    const pDescription = document.createElement('p');
    pDescription.innerHTML = book.description;
    bookElement.appendChild(pDescription);

    const h3Reviews = document.createElement('h3');
    h3Reviews.innerHTML = 'Reviews:';
    bookElement.appendChild(h3Reviews);

    const ulReviews = document.createElement('ul');
    bookElement.appendChild(ulReviews);

    book.reviews.forEach((review) => {
      const liReview = document.createElement('li');
      liReview.innerHTML = review;
      ulReviews.appendChild(liReview);
    });

    const img = document.createElement('img');
    img.src = `http://localhost:3000/${book.imageLink}`;
    img.alt = `${book.title} Cover`;
    bookElement.appendChild(img);
  });
};

const getBooks = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/data');
    const data = await response.json();

    const books = data.map((bookData) => {
      return {
        title: bookData.title,
        author: bookData.author,
        genre: bookData.genre,
        publicationYear: bookData.publicationYear,
        description: bookData.description,
        reviews: bookData.reviews,
        imageLink: bookData.imageLink,
      };
    });

    return books;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

window.onload = () => showBooks();
