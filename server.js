require('./server/config/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(require('./server/routers/info'))
app.use(require('./server/routers/login'))
app.use(require('./server/routers/index'))
app.use(require('./server/routers/usuario'))

mongoose.connect
    (process.env.urlDB, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
    
    (err, res) => {
        if (err) throw err; 
        console.log("Base de datos conectada")
    }
);

app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto", process.env.PORT)
})