const express = require('express');

const app = express();

// Middleware that allows Express to understand JSON request bodies
app.use(express.json());


// PIZZA DATA
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


// CHECK PIZZA MIDDLEWARE
const checkPizza = (req, res, next) => {

    const pizzaName = req.params.name;

    if (!pizzas[pizzaName]) {
        return res.status(404).send('Pizza not found');
    }

    // Attach the pizza to req
    req.pizza = pizzas[pizzaName];

    next();
};


// LOGGING MIDDLEWARE
app.use((req, res, next) => {

    console.log(`${req.method} request received`);

    next();
});


// =================================
// GET ALL PIZZAS
// GET /pizzas
// =================================

app.get('/pizzas', (req, res) => {

    res.send(pizzas);

});


// =================================
// GET ONE PIZZA
// GET /pizzas/:name
// =================================

app.get('/pizzas/:name', checkPizza, (req, res) => {

    res.send(req.pizza);

});


// =================================
// CREATE A NEW PIZZA
// POST /pizzas
//
// Example body:
// {
//     "name": "farmhouse",
//     "price": 300,
//     "quantity": 4
// }
// =================================

app.post('/pizzas', (req, res) => {

    const newPizza = req.body;

    pizzas[newPizza.name] = {
        price: newPizza.price,
        quantity: newPizza.quantity
    };

    res.send(pizzas[newPizza.name]);

});


// =================================
// ADD STOCK
// POST /pizzas/:name/add
//
// Example:
// POST /pizzas/paneer/add
//
// Body:
// {
//     "quantity": 5
// }
// =================================

app.post('/pizzas/:name/add', checkPizza, (req, res) => {

    req.pizza.quantity += req.body.quantity;

    res.send(req.pizza);

});


// =================================
// REMOVE STOCK
// POST /pizzas/:name/remove
//
// Example:
// POST /pizzas/paneer/remove
//
// Body:
// {
//     "quantity": 5
// }
// =================================

app.post('/pizzas/:name/remove', checkPizza, (req, res, next) => {

    if (req.pizza.quantity < req.body.quantity) {

        const error = new Error('Not enough pizza in stock');

        error.status = 400;

        return next(error);
    }

    req.pizza.quantity -= req.body.quantity;

    res.send(req.pizza);

});


// =================================
// DELETE A PIZZA
// DELETE /pizzas/:name
// =================================

app.delete('/pizzas/:name', checkPizza, (req, res) => {

    const pizzaName = req.params.name;

    delete pizzas[pizzaName];

    res.status(204).send();

});


// =================================
// RENAME A PIZZA
// PUT /pizzas/:name/name
//
// Example:
// PUT /pizzas/paneer/name
//
// Body:
// {
//     "newName": "cheese-paneer"
// }
// =================================

app.put('/pizzas/:name/name', checkPizza, (req, res) => {

    const oldName = req.params.name;

    const newName = req.body.newName;

    pizzas[newName] = pizzas[oldName];

    delete pizzas[oldName];

    res.send(pizzas[newName]);

});


// =================================
// ERROR-HANDLING MIDDLEWARE
// =================================

app.use((err, req, res, next) => {

    const status = err.status || 500;

    res.status(status).send(err.message);

});


module.exports = {
    app
};