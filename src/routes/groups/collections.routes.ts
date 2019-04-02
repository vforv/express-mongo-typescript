import express from "express";
import { Getter } from "seamless-injector";
import { authorizationMiddleware } from "../../middlewares/authorization.middleware";
import { CollectionsLogic } from "./../../logic/collections.logic";
import { CollectionsModel } from "./../../models/collections.model";

export class CollectionsRoutes {
    public collectionsLogic: CollectionsLogic;
    public collectionModel: CollectionsModel;

    constructor(private router: express.Router) {
        this.collectionsLogic = Getter<CollectionsLogic>("CollectionsLogic");
        this.collectionModel = Getter<CollectionsModel>("CollectionsModel");
    }

    public registerRoutes() {
        this.router.post("/collections", authorizationMiddleware(
            {
                model: this.collectionModel.collectionModel,
                roles: ["global-manager", "manager"]
            }
        ), this.collectionsLogic.create);

        this.router.get("/collections", this.collectionsLogic.read);

        this.router.put("/collections", authorizationMiddleware(
            {
                model: this.collectionModel.collectionModel,
                roles: ["global-manager", "manager"]
            }
        ), this.collectionsLogic.update);

        this.router.delete("/collections", authorizationMiddleware(
            {
                model: this.collectionModel.collectionModel,
                roles: ["global-manager", "manager"]
            }
        ), this.collectionsLogic.delete);

        return CollectionsRoutes.name;
    }
}
