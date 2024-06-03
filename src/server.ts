// src/server.ts

import "./whichEnviroment"; // Asegúrate de que las variables de entorno estén configuradas

// Import dependencies
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { generatedSchema } from "./graphql/apolloSchema";

// import context for Apollo Server
import { context } from "./graphql/context";

// Create Apollo Server instance
const server = new ApolloServer({
  context,
  schema: generatedSchema,
});
// console.log({ server });

// Create Express app instance
const app = express();

// Asynchronous function to start the server
export async function initializeServer() {
  await server.start();
  //   @ts-ignore
  server.applyMiddleware({ app });
  // console.log({ app });
  return app;
}
