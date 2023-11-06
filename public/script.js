const showBooks = async () => {
  const fetchedBooks = await getBooks();
  const container = document.getElementById('book-container');

  if (!fetchedBooks) {
    console.error('Invalid JSON');
    return;
  }

  fetchedBooks.forEach((book) => {
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book-container'); // Add the book container class
    container.appendChild(bookContainer);

    const h2 = document.createElement('h2');
    h2.innerHTML = book.title;
    bookContainer.appendChild(h2);

    const pAuthor = document.createElement('p');
    pAuthor.innerHTML = `Author: ${book.author}`;
    bookContainer.appendChild(pAuthor);

    const pGenre = document.createElement('p');
    pGenre.innerHTML = `Genre: ${book.genre}`;
    bookContainer.appendChild(pGenre);

    const pPublished = document.createElement('p');
    pPublished.innerHTML = `Published: ${book.publicationYear}`;
    bookContainer.appendChild(pPublished);

    const pDescription = document.createElement('p');
    pDescription.innerHTML = book.description;
    bookContainer.appendChild(pDescription);

    const h3Reviews = document.createElement('h3');
    h3Reviews.innerHTML = 'Reviews:';
    bookContainer.appendChild(h3Reviews);

    const ulReviews = document.createElement('ul');
    bookContainer.appendChild(ulReviews);

    book.reviews.forEach((review) => {
      const liReview = document.createElement('li');
      liReview.innerHTML = review;
      ulReviews.appendChild(liReview);
    });

    const img = document.createElement('img');
    img.src = `${book.imageLink}`;
    img.alt = `${book.title} Cover`;
    bookContainer.appendChild(img);
  });
};




const getBooks = async () => {
  try {
    const response = await fetch('/api/data');
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
