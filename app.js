const express = require('express');
const app = express();
const bookRoute = require('./api/routes/books');




app.use(express.json())
app.use('/books', bookRoute);


module.exports = app;