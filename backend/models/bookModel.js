const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');


const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A book need a name'],
        minlength: [4, 'Book name to short']
    },
    slug: String,
    description: {
        required: [true, 'A book need a description'],
        type: String,
        trim: true
    },
    author: {
        type: String,
        trim: true
    },
    image: [String],
    rating: {
        type: Number,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        default: 4
    }
});


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;