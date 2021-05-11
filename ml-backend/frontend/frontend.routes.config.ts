import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';

export class FrontendRoutes extends CommonRoutesConfig {

    constructor( app: express.Application ) {
        super(app, 'FrontendRoutes');
    }

    RouteConfig(): express.Application {
        // Get all items for given query params
        const frontendPath = 'dist/ml-frontend';
        this.app.use( express.static( frontendPath ));
        
        return this.app
    }

}