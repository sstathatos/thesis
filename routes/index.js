let express = require('express');
const router = require('express').Router();
let DetailView = require('../class_views/generic/base').DetailView;
let RedirectView = require('../class_views/generic/base').RedirectView;

let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let acl = require('acl');
let dbc = mongoose.connect('mongodb://localhost/test', {}); // todo VGALTA OLA AUTA: 1 fora kaneis connect stin DB (mono sto app.js)
acl = new acl(new acl.mongodbBackend(dbc.connection.db));


// log each request to the console for debug
router.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

// //first of all check if the user requesting is authenticated,or else redirect to '/'
// router.all('*', function (req, res, next) {
//     if ((req.url == '/login' && req.method == 'POST') || (req.url == '/' && req.method == 'GET') || (req.url == '/register' && req.method == 'POST')) next();
//     else {
//         if (req.isAuthenticated()) next();
//         else {
//             mf.errorRespond(req, res, '/', 'You are not authorised. Login to continue');
//         }
//     }
// });


router.get('/', (req, res) => {
    let view = new RedirectView(req, res);
    view.redirect_url = '/register';
    return view.as_view();
});

router.get('/error', (req, res) => {
    let my_view = new DetailView(req, res, null, 'error');
    my_view.layout = false;
    my_view.as_view();
});

router.use('/', require('./authentication.js'));
router.use('/users/', require('./users'));
router.use('/projects/', require('./projects'));
router.use('/posts/', require('./posts'));
router.use('/projects/', require('./datasets'));


module.exports = router;