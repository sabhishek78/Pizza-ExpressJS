const express = require('express');

const pizzasRouter = express.Router();

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


// PARAMETER MIDDLEWARE
pizzasRouter.param('name', (req, res, next, name) => {

    console.log(`Looking for pizza: ${name}`);

    if (!pizzas[name]) {
        return res.status(404).send('Pizza not found');
    }

    req.pizza = pizzas[name];

    next();
});


// GET ALL PIZZAS
pizzasRouter.get('/', (req, res) => {
    res.send(pizzas);
});


// GET ONE PIZZA
pizzasRouter.get('/:name', (req, res) => {
    res.send(req.pizza);
});


// ADD STOCK
pizzasRouter.post('/:name/add', (req, res) => {

    req.pizza.quantity += req.body.quantity;

    res.send(req.pizza);
});


module.exports = pizzasRouter;