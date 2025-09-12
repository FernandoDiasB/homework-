const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config({ path: './config.env'})

const app = express();

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connections succesfull!!!')
})

const port = 3000;
app.get('/', (req, res) => {
    res.send('ITs ALIVE!!!')
});

app.listen(port, () => {
    console.log(`Running on the port ${port}`)
});
