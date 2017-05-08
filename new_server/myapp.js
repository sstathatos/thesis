const express = require('express');
let passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
let app= express();
const dbHost = 'mongodb://localhost/daotest';
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.createConnection(dbHost, {}); // TO BE CHANGED
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//Express session/mongostore
app.use(session({
    secret: 'big Secret',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    ttl: 14*24*60*60, //=14 days,
    unset:'destroy',
    resave: false,
    saveUninitialized: false
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./routes2'));

app.set('port',(process.env.PORT || 3000));

app.listen(app.get('port'), () => {
    console.log('Server up: http://localhost:' +app.get('port'));

});
