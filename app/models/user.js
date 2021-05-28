const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    admin: { type: Boolean, default: 0 },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }

}, { timestamps: true });

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, bcrypt.genSaltSync(10))
        .then(hash => {
            this.password = hash
            next();
        })
        .catch(err => console.log(err));
});

userSchema.methods.comparePasswords = function(password) {
    return bcrypt.compareSync(password , this.password);
}


module.exports = mongoose.model('User', userSchema);