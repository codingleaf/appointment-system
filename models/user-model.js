import mongoose from 'mongoose';
import validator from 'validator';

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
}, {timestamps: true})

const User = mongoose.model('user', userSchema);
export default User;