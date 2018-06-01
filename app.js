const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

//Routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//Logging feature
//Morgan will use the next to move to the next middleware
app.use(morgan('dev'));

//Setting up de body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Setting the header to avoid CORS errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requrested-With, Content-Type, Accept', 'Authorization'
    );

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE');
        return res.status(200).json({});
    }

    next();

});



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