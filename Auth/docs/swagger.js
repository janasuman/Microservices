const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce web app',
      version: '1.0.0',
      description: 'API documentation for E-commerce application',
    },
    servers:[
      {
        url:`http://localhost:${process.env.PORT ||3000}`
      }
    ]
  },
  apis: ['./app/app.js','./app/endpoints/*.js'],
   // Path to the API routes
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
