const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());

const upload = multer({ dest: __dirname + "/public/images" });

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

let books = [
    {
        _id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
        publicationYear: 1925,
        description: "A novel about the American Dream",
        reviews: ["Captivating!", "A must-read"]
    },
    {
        _id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        publicationYear: 1960,
        description: "A story of racial injustice in the American South",
        reviews: ["Powerful!", "Touches the heart"]
    },
    {
        _id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        publicationYear: 1949,
        description: "A chilling vision of a totalitarian future",
        reviews: ["Thought-provoking", "Disturbingly accurate"]
    },
];

app.get("/api/books", (req, res) => {
    res.send(books);
});

app.post("/api/books", upload.single("img"), async (req, res) => {
    try {
        const result = validateBookInput(req.body);

        if (result.error) {
            res.status(400).send(result.error.details[0].message);
            return;
        }

        const book = {
            _id: books.length + 1,
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publicationYear: req.body.publicationYear,
            description: req.body.description,
            reviews: req.body.reviews.split(",")
        };

        books.push(book);
        res.send(books);
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.patch("/api/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedFields = req.body;

    console.log("Received PATCH request for book ID:", bookId);
    console.log("Updated Fields:", updatedFields);
    console.log("Current Books Array:", books);

    const index = books.findIndex((book) => book._id === bookId);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            title: updatedFields.title,
            author: updatedFields.author,
            genre: updatedFields.genre,
            publicationYear: parseInt(updatedFields.publicationYear),
            description: updatedFields.description,
            reviews: updatedFields.reviews
        };

        console.log("Updated Books Array:", books);

        res.send(books);
    } else {
        console.log("Book not found for ID:", bookId);
        console.log("Current Books Array:", books);
        res.status(404).send("Book not found");
    }
});

app.delete("/api/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);

    const index = books.findIndex((book) => book._id === bookId);

    if (index !== -1) {
        books.splice(index, 1);

        res.send(books);
    } else {
        console.log("Book not found for ID:", bookId);
        console.log("Current Books Array:", books);
        res.status(404).send("Book not found");
    }
});

const validateBookInput = (book) => {
    const schema = Joi.object({
        _id: Joi.allow(""),
        title: Joi.string().min(3).required(),
        author: Joi.string().min(3).required(),
        genre: Joi.string().min(3).required(),
        publicationYear: Joi.number().min(1900).required(),
        description: Joi.string().min(3).required(),
        reviews: Joi.allow("")
    });

    return schema.validate(book);
};

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
