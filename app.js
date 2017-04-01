// top of file
delete process.env["DEBUG_FD"];
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
const expressValidator = require('express-validator');
const dbHost = 'mongodb://localhost/test';
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.createConnection(dbHost);

const MongoStore = require('connect-mongo')(session);
const app = express();
//Set static folder
app.use(express.static(path.join(__dirname, 'public')));
const helpers = require('./helpers');
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

const hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: helpers
});

//View Engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//bodyparser middleware
app.use(bodyParser.json());
app.use(expressValidator({}));
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
app.use(flash());


app.use( function(req,res,next) {
    if(req.user) {
        res.locals.username=req.user.username;
    }
    res.locals.error=req.flash('error');
    res.locals.success=req.flash('success');
    next();
});

//main start
 app.use('/', require('./routes'));

//Set Port
app.set('port',(process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' +app.get('port'));
});
