import jwt from 'jsonwebtoken';
import User from '../models/user-model.js';

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  
  // token authentication
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        next();
      }
    })
  } else {
    res.redirect('/login');
  }
};

export const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        
        // make accessible in the views
        res.locals.user = user;
        next();
      }
    })
  } else {
    res.locals.user = null;
    next();
  }
}