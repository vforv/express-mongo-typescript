import express from "express";
import { Event, Getter } from "seamless-injector";
import { Routes } from "./routes/routes";

@Event("SingletonPattern")
export class Server {
    public server: express.Application;

    constructor() {
        // Get instance
        this.server = express();

        // Register all routes
        this.registerRoutes();
    }

    /**
     * Get app
     * instance where you
     * need it
     */
    public getApp() {
        return this.server;
    }

    private registerRoutes() {
        const routes = Getter<Routes>("Routes");
        this.server.use("/v1", routes.register());
        // tslint:disable-next-line:no-console
        console.log("All routes registed");
    }
}
