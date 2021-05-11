"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const frontend_routes_config_1 = require("./frontend/frontend.routes.config");
const items_routes_config_1 = require("./items/items.routes.config");
const dotenv_1 = __importDefault(require("dotenv"));
// Just to know how much time the server spent to wake up
console.time('Power On Time: ');
// Initialize dotenv to help with enviroment variables in local development
dotenv_1.default.config();
const app = express_1.default();
const server = http_1.default.createServer(app);
const port = process.env.PORT;
const routes = [];
// parse all incoming request as JSON
app.use(express_1.default.json());
// allow cross-origin requests
app.use(cors_1.default());
// Add all our routes
routes.push(new frontend_routes_config_1.FrontendRoutes(app), new items_routes_config_1.ItemsRoutes(app));
// Lets run the server
server.listen(port, () => {
    console.timeEnd('Power On Time: ');
    console.log(`Server up and Running on port ${port}`);
});
