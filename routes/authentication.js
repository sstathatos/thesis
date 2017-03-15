var express= require('express');
var router= require('express').Router();
var model_auth_ses= require('../models/model_authentication_session');
let RedirectView = require('../generic_views').RedirectView;
let UserCreateView = require('../class_views/user_views').UserCreateView;


router.post('/login', (req, res, next) => {
    model_auth_ses.passport.authenticate('local', {failureFlash: true}, (err, user, info) => {
        if (err) return next(err);
        else if (!user) {
            new RedirectView('/register', {type: 'error', info: info}).as_view(req, res);
        }
        else {
            req.logIn(user, (err) => {
                if (err) {
                    req.flash('error',info);
                    return next(err);
                }
                else (new RedirectView('/' + user.username, null)).as_view(req, res);
            });
        }
    })(req,res,next);
});

//Logout User
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        new RedirectView('/register', null).as_view(req, res);
    });
});

//Register User
router.all('/register', (req, res) => {
    new UserCreateView().as_view(req, res);
});

module.exports = router;