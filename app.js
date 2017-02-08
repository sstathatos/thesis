var express= require('express');
var session = require('express-session');
var bodyParser= require('body-parser');
var cookieParser= require('cookie-parser');
var passport= require('passport');
var dbHost = 'mongodb://localhost/test';
var mongoose= require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.createConnection(dbHost);
var MongoStore = require('connect-mongo')(session);

var routes= require('./routes');
var app= express();

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//Express session/mongostore
app.use(session({
    secret: 'big Secret',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    ttl: 14*24*60*60, //=14 days,
    resave: true,
    saveUninitialized: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//main start
app.use('/', routes);


//Set Port
app.set('port',(process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' +app.get('port'));
});
