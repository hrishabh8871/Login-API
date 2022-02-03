// Libraries, App Imports
const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')
const app = express();
const router = require('./Routes/routers');
const { NODE_ENV, PORT, MONGODBURL } = require('./Config/config')
const mongoUrl = MONGODBURL

// app config
app.use(express.urlencoded({
    extended: true
}))

app.use(cors());

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader('Access-Control-Allow-Headers', "*")
    next();
});

app.use('/', express.static(path.join(__dirname, '/public')));

// CROSS ORIGIN
app.use(cors());

app.listen(PORT || 5001, () => {
    console.warn(`Server has started on port ${process.env.PORT || 5001}`)
    console.warn(`Server has started ${new Date()}`)
    console.warn(`Server env ${NODE_ENV}`)
});




// Routers
app.use(router);

const connectDb = () => {
    try {
        mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
            console.log("Mongo db connected")
        });
    }
    catch (error) {
        console.log("could not connect, Please wait conection retrying...");
    }
}

connectDb();