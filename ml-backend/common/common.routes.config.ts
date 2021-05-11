import express from 'express';

export abstract class CommonRoutesConfig {
    /**
     * This is a blueprint for every route in the serrver.
     * It needs to be extended to individual routes.
     * @param app - express.Application instance
     * @param RouteConfig() - configuration method for the route
     * @param name - Just to name each route
     * super(app, 'ItemsRoutes'); - In the implementation we need toi call super method
     */
    app: express.Application;
    name: string;

    constructor( app: express.Application, name: string ) {
        this.app = app;
        this.name = name;
        this.RouteConfig();
    }

    getName(): string { return this.name; }

    abstract RouteConfig(): express.Application;

}