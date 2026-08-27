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

function logRequest(verb) {
    console.log(`${verb} request received`);
}

app.get('/pizzas', (req, res) => {
    logRequest(req.method);
    res.send(pizzas);
});


app.get('/pizzas/:name', (req, res) => {
    logRequest(req.method);
    const pizzaName = req.params.name;

    if (!pizzas[pizzaName]) {
        return res.status(404).send('Pizza not found');
    }

    res.send(pizzas[pizzaName]);
});


module.exports = {
    app
};