const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');

module.exports = class Application {

    constructor() {
        this.setupExpress();
        this.setMongooseConnection();
        this.setConfig();
        this.setrouters();
    }

    setupExpress() {
        app.listen(3000, () => console.log('server is listening on port 3000...'));
    }

    setConfig() {
        app.use(express.static('public'));
        app.set('view engine', 'ejs');
        app.set('views', path.resolve('..', 'resource', 'views'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(validator());
        app.use(session({
            secret: 'joyboy',
            resave: true,
            saveUninitialized: true,
            store: MongoStore.create({
                mongooseConnection: mongoose.connection,
                mongoUrl: 'mongodb://localhost/shopDB'
            })
        }));
        app.use(cookieParser('joyboy'));
        app.use(flash());
    }

    setMongooseConnection() {
        mongoose.connect('mongodb://localhost/shopDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
            .then(() => console.log('mongo connection open...'))
            .catch(e => console.log('mongo connection error!'));
    }

    setrouters() {
        app.use(require('routes/api'));
        app.use(require('routes/web'));
    }
}