'use strict';

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { swaggerDefinition } from "./docs/swaggerDefinition.ts"
import * as router from "./routes/index.ts";
import cors from "cors";
import cookieParser from "cookie-parser";

import { renderToString } from 'react-dom/server';
import template from './template.ts';
import connectToDatabase  from "./config/database.ts"


// // Constants
const PORT = Number(process.env.PORT);
const PORT_LOCAL = Number(process.env.PORT_LOCAL);
const HOST = String(process.env.HOST);
const HOST_LOCAL = String(process.env.HOST_LOCAL);
const swaggerOptions = {
  definition: swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [`./src/routes/*`],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.ts";
import HomePage from "./pages/HomePage.ts";

/** deprecated */
// async function startServerNormal() {
//   //Database
//   await connectToDatabase();

//   // App
//   const app = express();
//   app.use(express.json());
//   // app.use(express.urlencoded({extended:false}));
//   app.use(cors());
//   app.use(cookieParser());

//   app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, {explorer: true}));
//   // app.use('/parking', router.parkingsRoute);
//   app.use('/user', router.userRoute);
//   app.use('/recharge', router.rechargeRoute);


//   app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
//     let html = "<p>Hello World</p><a href='/api-docs'>API DOCS</a>";
//     res.send(html);
//   });

//   app.listen(PORT, HOST, () => {
//     console.log(`Running on http://${HOST_LOCAL}:${PORT_LOCAL}`);
//   });
// }

export async function startServer() {
    await connectToDatabase();
    // Create an Express app
    const app = express(); 
    app.use(cors({
        origin: "http://localhost:4321", // Replace with your frontend's origin
        methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    }));
    app.use(cookieParser());

    // Better-Auth route    
    app.all("/api/auth/*", toNodeHandler(auth));
    app.get("/api/me", async (req, res) => {
      const session = await auth.api.getSession({
          headers: fromNodeHeaders(req.headers),
        });
      return res.json(session);
    });
    
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, {explorer: true}));
    app.use('/recharge', router.rechargeRoute);    

    app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
      res.send(template({
        body: renderToString(HomePage),
        title: 'HOME PAGE'
      }));
    });

    app.use(express.json());


    // Start the Express server
    app.listen(PORT, HOST, () => {
      console.log(`Running on http://${HOST_LOCAL}:${PORT_LOCAL}`);
    });
}

startServer();

