
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Database
mongoose.connect('mongodb://localhost:27017/test2', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

//Config
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Routes
app.use('/api/products', require('./routes/products'));

//Start server
app.listen(app.get('port'), () => {
    console.log(`Server in port: ${app.get('port')}`);
})