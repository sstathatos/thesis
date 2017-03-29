var express = require('express');
var router = require('express').Router();
let DetailView = require('../generic_views').DetailView;
let RedirectView = require('../generic_views').RedirectView;


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