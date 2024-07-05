const express = require('express');
const mongodb = require('./database/monge');
const bodyParser = require('body-parser');
const env = require("dotenv").config()
const usersController = require('./controllers/contactController');
const swaggerAutogen = require('swagger-autogen')();
const cors = require('cors');
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const app = express();


// Parse JSON bodies
app.use(bodyParser.json());

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'Origin, x-Requested-With, Content-Type, Accept, z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error('Bad JSON:', err.message);
      return res.status(400).json({ error: 'Invalid JSON format' });
  }
  next();
});



app.use('/', require('./routes'));



const port = process.env.PORT
const host = process.env.HOST

mongodb.initDb((err) => {
  if(err) {
    console.log(err);
  }
  else {
    app.listen(process.env.PORT || port);
    console.log('Web Server is listening at port ' + (process.env.PORT || 3001));
  }
});