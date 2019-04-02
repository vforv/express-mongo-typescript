import bodyParser from "body-parser";
import express from "express";
import { Event } from "seamless-injector";
import { routeGroups } from "./groups";

@Event("DefaultPattern")
export class Routes {
    /**
     * Register all routes
     */
    public register() {
        const router = express.Router();
        router.use(bodyParser.json());
        router.use(bodyParser.urlencoded({ extended: true }));
        for (const routeGroup of routeGroups) {
            const group = new routeGroup(router).registerRoutes();
            // tslint:disable-next-line:no-console
            console.log(`Registed ${JSON.stringify(group)}`);
        }

        return router;
    }
}
