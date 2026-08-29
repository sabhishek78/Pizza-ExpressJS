const express = require('express');

const app = express();

app.use(express.json());


const pizzas = {
    margherita: {
        price: 200,
        quantity: 5
    },

    paneer: {
        price: 250,
        quantity: 3
    },

    cheese: {
        price: 180,
        quantity: 10
    }
};


// ========================================
// PARAMETER MIDDLEWARE
// Runs automatically for every :name
// ========================================

app.param('name', (req, res, next, name) => {

    console.log(`Looking for pizza: ${name}`);

    if (!pizzas[name]) {
        return res.status(404).send('Pizza not found');
    }

    req.pizza = pizzas[name];

    next();
});


// ========================================
// GET ALL PIZZAS
// ========================================

app.get('/pizzas', (req, res) => {

    res.send(pizzas);

});


// ========================================
// GET ONE PIZZA
// app.param() automatically runs first
// ========================================

app.get('/pizzas/:name', (req, res) => {

    res.send(req.pizza);

});


// ========================================
// ADD STOCK
// ========================================

app.post('/pizzas/:name/add', (req, res) => {

    req.pizza.quantity += req.body.quantity;

    res.send(req.pizza);

});


// ========================================
// REMOVE STOCK
// ========================================

app.post('/pizzas/:name/remove', (req, res, next) => {

    if (req.pizza.quantity < req.body.quantity) {

        const error = new Error('Not enough pizza in stock');
        error.status = 400;

        return next(error);
    }

    req.pizza.quantity -= req.body.quantity;

    res.send(req.pizza);

});


// ========================================
// DELETE PIZZA
// ========================================

app.delete('/pizzas/:name', (req, res) => {

    delete pizzas[req.params.name];

    res.status(204).send();

});


// ========================================
// ERROR MIDDLEWARE
// ========================================

app.use((err, req, res, next) => {

    res.status(err.status || 500).send(err.message);

});


module.exports = { app };