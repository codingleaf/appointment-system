import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  
  // token authentication
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    })
  } else {
    res.redirect('/login');
  }
};

export default requireAuth;