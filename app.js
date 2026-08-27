const express = require('express');

const app = express();

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

app.use((req, res, next) => {
    console.log(`${req.method} request received`);
    next();
});

app.use((req, res, next) => {
    console.log('Middleware 1');
    next();
});

app.use((req, res, next) => {
    console.log('Middleware 2');
    next();
});

app.get('/pizzas', (req, res) => {
    res.send(pizzas);
});


app.get('/pizzas/:name', (req, res) => {
  
    const pizzaName = req.params.name;

    if (!pizzas[pizzaName]) {
        return res.status(404).send('Pizza not found');
    }

    res.send(pizzas[pizzaName]);
});


module.exports = {
    app
};