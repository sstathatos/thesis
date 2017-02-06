var express= require('express');
var bodyParser= require('body-parser');
var model_entity=require("./model_entity");
var app= express();
var dbHost = 'mongodb://localhost/test';
var mongoose= require('mongoose');
mongoose.connect(dbHost);


//Set Port
app.use(bodyParser.json());
app.set('port',(process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' +app.get('port'));
});
