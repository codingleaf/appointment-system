import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth-routes.js';

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

app.get('/', (req, res) => {
  res.render('home', { title: 'HOME' });
});

app.use('/', authRoutes);

// 404 Error Handling
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

