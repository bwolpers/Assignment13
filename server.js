const express = require('express');
const app = express();



app.get('/api/data', (req, res) => {
  const bookData = [];
    bookdata[0] ={
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
      imageLink: 'images/bookCover.jpg',
    };

  res.json(bookData); 
});

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

const port = 3000; // Define the port

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
