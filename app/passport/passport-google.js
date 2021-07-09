const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('app/models/user');


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use(new GoogleStrategy({
    clientID: '531169015506-piugknrrtotbbcgf7fc9uvqfajqt6ogf.apps.googleusercontent.com',
    clientSecret: 'YOffzSqJsalvRaUAG6hXf7xM',
    callbackURL: 'http://localhost:3000/auth/google/cb'
},
    function (accessToken, refreshToken, profile, cb) {

        User.findOne({ email: profile.emails[0].value }, (err, user) => {
            if (err) return cb(err);
            if (user) return cb(null, user);

            const newUser = new User({
                name : profile.displayName,
                email : profile.emails[0].value,
                password : profile.id
            });

            newUser.save(err => {
                if(err)  cb(err);
                cb(null , newUser);
            })
        })

    }
));

