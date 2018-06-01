const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//the method use creates a middleware. So, every incoming
//requests will have to pass throw it.

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;