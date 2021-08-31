const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const dotenv = require('dotenv');
const userCollection = require('./routes/users_routes');
const curseCollection = require('./routes/curses_routes');
const login = require('./routes/auth_routes');

dotenv.config();


const conn = async() => {
    try {
        await mongoose.connect(config.get('DBconfig.STRING'), {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    console.log('Se ha establecido la conexion con MongoDB')
    } catch (error) {
        console.log(`No se ha establecido la conexion por el error: ${error}`)
    }
    
}

conn();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('/', (req, res) => {
    res.json({msj : 'Funciona'});
});

app.use('/api/login', login);
app.use('/api/users', userCollection);
app.use('/api/curses',  curseCollection);

const port = config.get('appConfig.PORT') || 5050;
const host = config.get('appConfig.HOST') || "0.0.0.0";

app.listen(port, host, () => console.log(`App corriendo en el puerto ${port} con el host ${host}`));