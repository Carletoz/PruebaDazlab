import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/Router";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { PORT } from "./config/envs";

const server = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de Pokemons",
      version: "1.0.0",
      description: "Documentación de la API de Pokemons",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./src/controllers/*.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));
server.use(router);

export default server;
