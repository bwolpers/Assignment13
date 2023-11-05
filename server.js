const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the default port or 3000

// Create an array of book data
const bookData = [
  {
    id: 1,
    title: 'Book 1',
    author: 'Author 1',
    genre: 'Fiction',
    publicationYear: 2020,
    description: 'Description of Book 1',
    reviews: [
      'Review 1',
      'Review 2',
      'Review 3'
    ],
    imageLink: 'link-to-book-cover-1.jpg',
  },
  // Add more book data records
];

app.get('/api/data', (req, res) => {
  res.json(bookData); // Serve the book data as JSON when someone accesses /api/data
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
