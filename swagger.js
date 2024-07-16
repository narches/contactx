const swaggerAutogen = require('swagger-autogen')();
// const swaggerDocument = require('./swagger.json');

const doc = {
    info: {
        title: 'Contact API',
        description: 'A simple API for managing users',
    },
    host: 'localhost:8080',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];


//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);