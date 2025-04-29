const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    pseudo: {type: String, default: ""},
    hashed_password: {type: String, default: ""}
});

const validatePresenceOf = value => value && value.length;

UserSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        this.hashed_password = this.encryptPassword(password);
})
    .get(function() {
        return this._password;
});

UserSchema.path('pseudo').validate(function(pseudo) {
    return pseudo.length;
}, 'Pseudo cannot be blank');

UserSchema.path('pseudo').validate(function(pseudo) {
    return new Promise(resolve => {
      const User = mongoose.model('Users');
  
      if (this.isNew || this.isModified('pseudo')) {
        User.find({ pseudo }).then((err, users) => resolve(!err && !users.length));
      } 
      else resolve(true);
    });
  }, 'Pseudo `{VALUE}` already exists');

UserSchema.path('hashed_password').validate(function(hashed_password) {
    return hashed_password.length && this._password.length;
}, 'Password cannot be blank');

UserSchema.pre('save', function(next) {
    if (!this.isNew) return next();
  
    if (!validatePresenceOf(this.password)) {
        next(new Error('Invalid password'));
    } else {
        next();
    }
});

UserSchema.methods = {
    authenticate: function(password) {
        return bcrypt.compareSync(password, this.hashed_password);
    },
    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return bcrypt.hashSync(password, 10)
        } catch (err) {
            return '';
        }
    },
}

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;