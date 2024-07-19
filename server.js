const express = require('express');
const mongodb = require('./database/monge'); // Ensure this is the correct path to your MongoDB connection file
const bodyParser = require('body-parser');
const env = require("dotenv").config();
const usersController = require('./controllers/contactController');
const swaggerAutogen = require('swagger-autogen')();
const cors = require('cors');
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const app = express();


// Parse JSON bodies
app.use(bodyParser.json());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON:', err.message);
    return res.status(400).json({ error: 'Invalid JSON format' });
  }
  next();
});

app.use(session({
  secret: process.env.SESSION_SECRET, // Ensure this is set in your .env file
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'], origin: '*' }));

app.use('/', require('./routes'));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function (accessToken, refreshToken, profile, done) {
  // User.findOrCreate({ githubId: profile.id }, function (err, user) {
  return done(null, profile);
  // });
}
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => {
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out");
});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false
}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  });



const port = process.env.PORT || 10000;
const host = process.env.HOST || 'https://contactx.onrender.com';

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Web Server is listening at port ${port}`);
    });
  }
});
