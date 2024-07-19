const swaggerAutogen = require('swagger-autogen')();
const swaggerDocument = require('./swagger.json');

const doc = {
    info: {
        title: 'Contact API',
        description: 'A simple API for managing users',
    },
    host: 'https://contactx.onrender.com',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];


//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);