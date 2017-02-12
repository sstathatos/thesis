var express= require('express');
var router= express.Router();
var model_entity= require('./models/model_entity');
var model_auth_ses= require('./models/model_authentication_session');

router.get('/home', function(req,res) {
    res.render('welcome', {layout: false});
})

router.post('/login', model_auth_ses.passport.authenticate('local') ,function(req,res){
    console.log("LOGIN REQUEST: -----------------------------------");
    console.log(req.session);
    res.sendStatus(200);
});

router.get('/logout',function (req,res) {
    console.log("LOGOUT REQUEST:---------------------------------- ");
    console.log(req.session);
    req.logOut();
    req.session.destroy( function(err) {
    })
    res.sendStatus(200);
})

router.all('*',model_auth_ses.ensureAuthenticated, function(req,res) {
    console.log("RANDOM REQUEST:---------------------------------- ");
    console.log(req.session);
    console.log("if this is printed, i have authorization :D");
    console.log(req.headers);
    res.clearCookie('sid', {path: '/'});
    res.sendStatus(200);
})

module.exports = router;
