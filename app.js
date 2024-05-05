import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth-routes.js';
import { requireAuth, checkUser } from './middleware/auth-middleware.js';
import User from './models/user-model.js';
import Appointment from './models/appointment-model.js';
import jwt from 'jsonwebtoken';

// ExpressJS application
const app = express();

// Register view engine
app.set('view engine', 'ejs');

// Connect to database
try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Successfully Connected to Database');
} catch (err) {
  console.error(err);
}

// Connect to server
app.listen(process.env.PORT, console.log('Server listening on Port', process.env.PORT));

/* In POST request, takes all url encoded data
 * and passes that into an object that can be used
 * on the request object
 */
app.use(express.urlencoded({ extended: true }));

// Serve static files (images, css, etc.)
app.use(express.static('./public'));

/* Parses JSON that comes from a request into a JavaScript Object
 * and attaches it to the request object for accessing with request handlers
 */
app.use(express.json());

// Cookies handler
app.use(cookieParser());

// Routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home', { title: 'HOME' }));
app.get('/create-appointment', requireAuth, (req, res) => res.render('create-appointment', { title: 'Create Appointment' }));
app.post('/create-appointment', async (req, res, next) => {
  let { appointmentDate, appointmentTime, services } = req.body;
  services = JSON.parse(services);

  let userID = null;
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400);
      } else {
        let user = await User.findById(decodedToken.id);
        if (user) {
          userID = decodedToken.id;
          await Appointment.create({ userID, appointmentDate, appointmentTime, services });
          console.log(req.body);
          res.status(200).json(req.body);
        }
      }
    })
  } else {
    res.status(400);
  }
})
app.get('/appointment-details', requireAuth, (req, res) => res.render('appointment-details', { title: 'Appointment Details' }));
app.get('/change-appointment', requireAuth, (req, res) => res.render('change-appointment', { title: 'Change Appointment' }));
app.get('/admin-appointment-details', requireAuth, (req, res) => res.render('admin-appointment-details', { title: 'View All Appointments' }));
app.use(authRoutes);

// 404 Error Handling
app.use((req, res) => {
  res.status(404).render('404', { title: 'ERROR: 404' });
});

