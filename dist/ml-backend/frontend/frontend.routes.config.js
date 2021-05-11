"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontendRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const express_1 = __importDefault(require("express"));
class FrontendRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'FrontendRoutes');
    }
    RouteConfig() {
        // Get all items for given query params
        const frontendPath = 'dist/ml-frontend';
        this.app.use(express_1.default.static(frontendPath));
        return this.app;
    }
}
exports.FrontendRoutes = FrontendRoutes;
