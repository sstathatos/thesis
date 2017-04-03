const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
let Entities = require('./entity').Entities;
const users = Entities[0];

//authentication strategy-passport
passport.use(new LocalStrategy (
    function(username, password, done) {
        users.dao.read({username: username}, function (err, user) {
            if(err) throw err;
            if(!user) {
                return done(null , false,'Unknown User');
            }
            else if (user.password == password) { //todo allaxe to na min vgazei warning (may cause unexpected type coersion)
                return done(null,user);
            }
            else {
                return done(null,false,'Invalid password');
            }
        });
    }
));

passport.serializeUser(function(user,done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    users.dao.read({_id: id}, function (err, user) {
        done(err, user);
    });
});

module.exports= {
    passport:passport
};
