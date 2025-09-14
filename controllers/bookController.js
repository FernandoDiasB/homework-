const Book = require('../models/bookModel');
const catchAsync = require('../utils/catchAsync')


exports.getAllBooks = catchAsync( async (req, res) => {
        const books = await Book.find();

        res.status(200).json({
            result: books.length,
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                books
            }
        });
})

exports.getBook = catchAsync(async (req, res) => {
        const book = await Book.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                book
            }
        });
})

exports.createBook = catchAsync(async (req, res) => {
        const newBook = await Book.create(req.body);

        res.status(200).json({
            status: 'success',
            data: {
                newBook
            }
        })
})

exports.updateBook = catchAsync(async (req, res) => {
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

})

exports.deleteBook = catchAsync(async (req, res) => {
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
})