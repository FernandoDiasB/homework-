const Book = require('../models/bookModel.js');
const catchAsync = require('../utils/catchAsync')


exports.getAllBooks = catchAsync(async (req, res) => {
    let queryObj = {};

    //name filter
    if(req.query.search) {
        queryObj.name = {$regex: req.query.search, $options: "i"};
        console.log("rodando pelo menos")
    }
    // rating filter
    if(req.query.rating){
        queryObj.rating = {$gte: req.query.rating};
    }
    
    let query = Book.find(queryObj);
    
    //sort
    if(req.query.sort) {
        queryObj = query.sort({name: 1});
    }

    if(req.query.sortRating){
        queryObj = query.sort({rating: -1});
    }   
    

    // pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 9;
    const skip = (page - 1) * limit

    query = query.skip(skip).limit(limit);
    if (req.query.page) {
        const numBooks = await Book.countDocuments();
        if (skip >= numBooks) throw new Error('This page does not exist');
    }
    
    const books = await Book.find(queryObj).skip(skip).limit(limit);

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

    res.status(201).json({
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
    res.status(200).json({
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

exports.getSynopsis = catchAsync(async (req, res) => {
    const book = await Book.findById(req.params.id).select('description name author rating image');
    if (!book) {
        return res.status(404).json({
            status: 'fail',
            message: 'Book not found'
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    });
});
