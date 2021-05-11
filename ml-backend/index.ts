import express from 'express';
import http from 'http';
import cors from 'cors';
import { CommonRoutesConfig } from './common/common.routes.config';
import { FrontendRoutes } from './frontend/frontend.routes.config'
import { ItemsRoutes } from './items/items.routes.config';
import dotenv from 'dotenv';

// Just to know how much time the server spent to wake up
console.time('Power On Time: ');

// Initialize dotenv to help with enviroment variables in local development
dotenv.config();

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT;
const routes: CommonRoutesConfig[] = [];

// parse all incoming request as JSON
app.use( express.json() );
// allow cross-origin requests
app.use( cors() );

// Add all our routes
routes.push(
    new FrontendRoutes(app),
    new ItemsRoutes(app)
);

// Lets run the server
server.listen( port, () => {
    console.timeEnd('Power On Time: ');
    console.log(`Server up and Running on port ${port}`);
})
