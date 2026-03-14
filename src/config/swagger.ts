import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Email Verification Auth API",
      version: "1.0.0",
      description: "API documentation for the Email Verification System"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./src/routes/*.ts"]
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };