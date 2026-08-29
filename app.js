const express = require('express');

const pizzasRouter = require('./pizzasRouter');

const app = express();

app.use(express.json());

app.use('/pizzas', pizzasRouter);

module.exports = { app };