const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Supplier & Product API",
      version: "1.0.0",
      description: "API documentation for Supplier and Product CRUD",
    },
    servers: [
      {
        url: "http://localhost:3000", // Thay đổi nếu deploy
      },
    ],
  },
  apis: ["./routes/*.js"], // nơi chứa swagger annotation
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
