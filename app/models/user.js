var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-node');

var UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  googleId: {
    type: String
  },
  googleToken: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', function (next) {
  if (this.password) {
    this.password = this.generateHash(this.password);
  }
  next();
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
