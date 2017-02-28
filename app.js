// top of file
delete process.env["DEBUG_FD"];
var express= require('express');
var path = require('path');
var session = require('express-session');
var bodyParser= require('body-parser');
var flash = require('connect-flash')
var cookieParser= require('cookie-parser');
var exphbs  = require('express-handlebars');
var methodOverride = require('method-override')
var passport= require('passport');
var expressValidator = require('express-validator');
var dbHost = 'mongodb://localhost/test';
var mongoose= require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.createConnection(dbHost);
var MongoStore = require('connect-mongo')(session);

var routes= require('./routes');
var app= express();

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

//View Engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
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

//Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Passport init
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use( function(req,res,next) {
    res.locals.error=req.flash('error');
    res.locals.success=req.flash('success');
    next();
});

//main start
app.use('/', routes);

//Set Port
app.set('port',(process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' +app.get('port'));
});
