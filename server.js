const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/data', (req, res) => {
    const books = [
        {
            title: 'The Secret',
            author: 'Jack Reacher',
            genre: 'Thriller',
            publicationYear: 2020,
            description: 'In this gripping thriller, Jack Reacher embarks on a relentless quest to uncover "The Secret." As he delves deeper into the mysterious conspiracy, he discovers a truth that could change everything. A pulse-pounding page-turner that will keep you on the edge of your seat from start to finish.',
            reviews: ['An electrifying read! Jack Reacher at his best.', 'I couldn\'t put this book down. The suspense is off the charts!', 'A must-read for thriller fans.'],
            imageLink: 'images/bookCover.jpg',
        },
        {
            title: 'The Exchange: After the Firm',
            author: 'John Grisham',
            genre: 'Legal Thriller',
            publicationYear: 2020,
            description: 'In this legal thriller, John Grisham takes us back to the world of lawyers and courtroom drama. "The Exchange" is a gripping tale of a young attorney, fresh out of law school, who stumbles upon a dark secret within his prestigious law firm. As he unravels the truth, he faces a dangerous choice that could change his life forever.',
            reviews: ['Classic John Grisham. A legal thriller with heart.', 'Riveting and thought-provoking. A page-turner that makes you question ethics and justice.', 'A must-read for fans of legal thrillers.'],
            imageLink: 'images/bookCover2.jpg',
        },
        {
            title: 'King of Greed',
            author: 'Ana Huang',
            genre: 'Contemporary Romance',
            publicationYear: 2020,
            description: '"King of Greed" is a heartwarming contemporary romance that follows the journey of two individuals brought together by fate. Amidst the bustling streets of New York City, they find love, hope, and a second chance at happiness. Ana Huang\'s storytelling shines in this tale of love, redemption, and the pursuit of dreams.',
            reviews: ['A beautiful love story that tugs at your heartstrings.', 'Ana Huang\'s writing is simply enchanting. I couldn\'t help but fall in love with the characters.', 'A delightful read that left me with a smile on my face.'],
            imageLink: 'images/bookCover3.jpg',
        },
        {
            title: 'Fourth Wing',
            author: 'Rebecca Yarros',
            genre: 'Science Fiction',
            publicationYear: 2021,
            description: 'In Fourth Wing, Rebecca Yarros takes us on a thrilling journey through a dystopian future where the fate of humanity hangs in the balance. With high-stakes action, complex characters, and a plot full of unexpected twists, this science fiction masterpiece will leave you on the edge of your seat.',
            reviews: ['A mind-bending journey into the future. Yarros delivers a gripping story!', 'An instant classic. I couldn\'t stop reading until the very end.', 'Science fiction fans, don\'t miss this one.'],
            imageLink: 'images/bookCover4.jpg',
        },
        {
            title: 'Lessons in Chemistry',
            author: 'Bonnie Garmus',
            genre: 'Historical Fiction',
            publicationYear: 2022,
            description: 'Lessons in Chemistry is a beautifully written historical fiction novel that transports readers to the mid-20th century. With a brilliant scientist as the protagonist and a tale of resilience and empowerment, Bonnie Garmus crafts a story that leaves a lasting impact.',
            reviews: ['A masterpiece of historical fiction. Garmus weaves a captivating narrative.', 'I was captivated by the protagonist\'s journey. A must-read for fans of the genre.', 'Historical fiction at its finest.'],
            imageLink: 'images/bookCover5.jpg',
        },
    ];

    res.json(books);
});

app.listen(3000, () => {
    console.log("listening");
});
