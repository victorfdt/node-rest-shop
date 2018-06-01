const express = require('express');
const app = express();

//the method use creates a middleware. So, every incoming
//requests will have to pass throw it.
app.use((req, res, next) => {

    //It respondes a 200 status in the json format
    res.status(200).json({
        message: "It works!"
    });
});

module.exports = app;