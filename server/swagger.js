const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'https://koinx-laft.onrender.com'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/cryptoOperations.js'];


swaggerAutogen(outputFile, routes, doc);