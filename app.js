import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';

// ExpressJS application
const app = express();

// Register view engine
app.set('view engine', 'ejs');

// Connect to database
await mongoose.connect(process.env.MONGODB_URI);
console.log('Successfully Connected to Database');

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

app.get('/login', (req, res) => {
  res.render('login', { title: 'LOGIN' });
});

app.get('/signup', (req, res) => {
  res.render('signup', { title: 'SIGN UP' });
});

// 404 Error Handling
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

