const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');

const bookRouter = require('./routes/bookRoutes.js');

dotenv.config({ path: './config.env'})

const app = express();

app.use(express.json());

app.use('/api/book', bookRouter);

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connections succesfull!!!')
})

const port = 3000;

app.listen(port, () => {
    console.log(`Running on the port ${port}`)
});


