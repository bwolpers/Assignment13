const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });


  app.get('/api/data', (req, res) => {
    const books = [
      {
        title: 'Book 1',
        author: 'Author 1',
        genre: 'Fiction',
        publicationYear: 2020,
        description: 'Description of Book 1',
        reviews: ['Review 1', 'Review 2', 'Review 3'],
        imageLink: 'images/bookCover.jpg',
      },
      {
        title: 'Book 2',
        author: 'Author 2',
        genre: 'Fiction',
        publicationYear: 2020,
        description: 'Description of Book 2',
        reviews: ['Review 1', 'Review 2', 'Review 3'],
        imageLink: 'images/bookCover2.jpg',
      },
      {
        title: 'Book 3',
        author: 'Author 3',
        genre: 'Fiction',
        publicationYear: 2020,
        description: 'Description of Book 3',
        reviews: ['Review 1', 'Review 2', 'Review 3'],
        imageLink: 'images/bookCover3.jpg',
      },
    ];
  
    res.json(books);
  });



app.listen(3000, () => {
  console.log("listening");
});