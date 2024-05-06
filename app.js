import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth-routes.js';
import appointmentRoutes from './routes/appointment-routes.js';
import { checkUser } from './middleware/auth-middleware.js';

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
app.use(authRoutes);
app.use(appointmentRoutes);

// 404 Error Handling
app.use((req, res) => {
  res.status(404).render('404', { title: 'ERROR: 404' });
});

