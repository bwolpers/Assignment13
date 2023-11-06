const container = document.getElementById('book-container'); // Select the book container element

fetch('/api/data')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((book) => {
      const bookElement = document.createElement('div');
      bookElement.classList.add('record');
      bookElement.innerHTML = `
        <h2>${book.title}</h2>
        <p>Author: ${book.author}</p>
        <p>Genre: ${book.genre}</p>
        <p>Published: ${book.publicationYear}</p>
        <p>${book.description}</p>
        <h3>Reviews:</h3>
        <ul>
          ${book.reviews.map((review) => `<li>${review}</li>`).join('')}
        </ul>
        <img src="${book.imageLink}" alt="${book.title} Cover">
      `;
      container.appendChild(bookElement);
    });
  });

console.log('Starting the client-side script');
