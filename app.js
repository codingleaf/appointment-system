import express from 'express';
import mongoose from 'mongoose';

// ExpressJS application
const app = express();

const PORT = 3000;

// Database connection string
const mongodbURI = 'mongodb+srv://admin:adminqazxcv@appt-sys-db.f5jvv3h.mongodb.net/appt-sys-db?retryWrites=true&w=majority&appName=appt-sys-db';

// Register view engine
app.set('view engine', 'ejs');

// Connect to database
try {
  await mongoose.connect(mongodbURI);
  console.log('Successfully Connected to Database');
  app.listen(PORT);
  console.log('Server listening on Port', PORT);
} catch(error) {
  console.error(error);
}

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

