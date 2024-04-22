import User from '../models/user-model.js';

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { firstName: '', lastName: '', email: '', password: '', role: '' };

  // duplicate error code
  if (err.code === 11000) {
    errors.email = 'Email is already registered';
    return errors;
  }

  // error validations
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach((properties) => {
      errors[properties.path] = properties.message;
    })
  }

  return errors;
}

export const signup_get = (req, res) => {
  res.render('signup', { title: 'SIGN UP' });
};

export const signup_post = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  
  try {
    const user = await User.create({ firstName, lastName, email, password, role });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

export const login_get = (req, res) => {
  res.render('login', { title: 'LOGIN' });
};

export const login_post = (req, res) => {
  
};