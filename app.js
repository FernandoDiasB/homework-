const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const bookRouter = require('./routes/bookRoutes.js');
const AppError = require('./utils/appError.js');
const cors = require('cors');

dotenv.config({ path: './config.env'})

const app = express();

app.use(express.json());

//this alows frontend conection to my api
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
}))

//Routs
app.use('/api/book', bookRouter);

//DB conection
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connections succesfull!!!')
})

app.all(/.*/, (req, res, next) => {
    next(new AppError(`cant find ${req.originalUrl}`, 404));
});

//Global error middleware  
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
})


const port = 3000;
app.listen(port, () => {
    console.log(`Running on the port ${port}`)
});
