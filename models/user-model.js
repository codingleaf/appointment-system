import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter your First Name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your Last Name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid Email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [8, 'Minimum password length is 8 characters']
  },
  role: {
    type: String,
    required: [true, 'Role unset']
  }
}, {timestamps: true});

// mongoose hooks
userSchema.pre('save', async function (next) {
  console.log('Creating user...');
  const saltRounds = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
})

userSchema.post('save', function (doc, next) {
  console.log("Successfully registered new user");
  next();
});

// static login method
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const authenticated = await bcrypt.compare(password, user.password);
    if (authenticated) {
      return user;
    }
    throw Error('Incorrect Password');
  }
  throw Error('Invalid Email')
}

const User = mongoose.model('user', userSchema);
export default User;