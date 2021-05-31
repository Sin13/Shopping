const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { authenticate } = require('passport');
const uniqueString = require('unique-string')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    admin: { type: Boolean, default: 0 },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    rememberToken: { type: String }
}, { timestamps: true });

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash
            next();
        })
        .catch(err => console.log(err));
});

userSchema.methods.comparePasswords = function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.rememberLogin = function (res) {
    const token = uniqueString();
    res.cookie('remember_token', token, { signed: true, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
    this.rememberToken = token;
    this.save();
};

module.exports = mongoose.model('User', userSchema);
