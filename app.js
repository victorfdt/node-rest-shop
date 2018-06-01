const express = require('express');
const app = express();

const morgan = require('morgan');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//Logging feature
//Morgan will use the next to move to the next middleware
app.use(morgan('dev'));

//the method use creates a middleware. So, every incoming
//requests will have to pass throw it.
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//Handling Not found route error
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;

    //It will forward the request with the error
    next(error); 
});

//Handling any other kind of error
app.use((error, req, res, next) => {
    error.status = error.status || 500;
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;