let express = require('express');
const router = require('express').Router();
let model_auth_ses = require('../models/model_authentication_session');
let RedirectView = require('../class_views/generic/base').RedirectView;
let UserCreateView = require('../class_views/user_views').UserCreateView;


router.post('/login', (req, res, next) => {
    model_auth_ses.passport.authenticate('local', {failureFlash: true}, (err, user, info) => {
        console.log(user);
        if (err) return next(err);
        else if (!user) {
            new RedirectView(req, res, '/register', {type: 'error', info: info}).as_view();
        }
        else {
            req.logIn(user, (err) => {
                if (err) {
                    req.flash('error',info);
                    return next(err);
                }
                else (new RedirectView(req, res, '/users/' + user.username, null)).as_view();
            });
        }
    })(req,res,next);
});

//Logout User
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        new RedirectView(req, res, '/register', null).as_view();
    });
});

//Register User
router.all('/register', (req, res) => {
    let my_view = new UserCreateView(req, res);
    my_view.data = req.body;
    my_view.as_view();

});

module.exports = router;