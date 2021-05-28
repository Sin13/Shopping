const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('app/models/user');


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local-register', new localStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    (req, email, password, done) => {
        User.findOne({ email: email }, function (err, user) {
            if (err) return done(err);
            if (user) return done(null, false, req.flash('errors', 'این آدرس ایمیل قبلا ثبت شده است'));

            const newUser = new User({
                name: req.body.name,
                email,
                password
            });

            newUser.save()
                .then(() => done(null, newUser))
                .catch((err) => done(err, false, req.flash('errors', 'ثبت نام با موفقیت انجام نشد لطفا دوباره سعی کنید')));
        });
    }
));

passport.use('local-login', new localStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    (req, email, password, done) => {
        User.findOne({ email: email }, function (err, user) {
            if (err) return done(err);
            if (!user || !user.comparePasswords(password)) return done(null, false, req.flash('errors', 'آدرس ایمیل یا رمز عبور صحیح نیست'));
            else done(null, user);
        });
    }
));