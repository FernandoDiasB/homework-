const Book = require('../models/bookModel');


exports.getAllBooks = async (req, res) => {
    try {

        const books = await Book.find();

        res.status(200).json({
            result: books.length,
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                books
            }
        });
    } catch {
        res.status(404).json({
            status: 'fail',
            message: err.message

        })
    }
}
exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                book
            }
        });
    } catch {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}
exports.createBook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body);

        res.status(200).json({
            status: 'success',
            data: {
                newBook
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,   //return the document updated
            runValidators: true // validate the data again in the schema
        });

        if (!book) {
            res.status(404).json({
                status: 'fail',
                message: 'Not found'
            })
        }

        res.status(204).json({
            status: 'success',
            data: {
                book
            }
        })

    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            res.status(404).json({
                status: 'fail',
                message: err.message
            })
        }
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}