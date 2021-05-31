const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const appLocals = require('./appLocals');
const rememberLogin = require('app/http/middlewares/rememberLogin');

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
        require('app/passport/passport-local');

        app.use(express.static('public'));
        app.set('view engine', 'ejs');
        app.set('views', path.resolve('resource', 'views'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(session({
            secret: 'joyboy',
            resave: true,
            saveUninitialized: true,
            store: MongoStore.create({
                mongooseConnection: mongoose.connection,
                mongoUrl: 'mongodb://localhost/shopDB'
            }),
            // 6 hours
            cookie: { expires: new Date(Date.now() + 1000 * 60 * 60 * 6) }
        }));
        app.use(cookieParser('joyboy'));
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(rememberLogin.check);
        app.use((req, res, next) => {
            app.locals = new appLocals(req, res).auth();
            next();
        })
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
        app.use(require('app/routes/api'));
        app.use(require('app/routes/web'));
    }
}