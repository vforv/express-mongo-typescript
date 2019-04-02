import express from "express";
import { Getter } from "seamless-injector";
import { authorizationMiddleware } from "../../middlewares/authorization.middleware";
import { ItemsLogic } from "./../../logic/items.logic";
import { ItemsModel } from "./../../models/items.model";

export class ItemsRoutes {
    public itemsLogic: ItemsLogic;
    public itemsModel: ItemsModel;

    constructor(private router: express.Router) {
        this.itemsLogic = Getter<ItemsLogic>("ItemsLogic");
        this.itemsModel = Getter<ItemsModel>("ItemsModel");
    }

    public registerRoutes() {
        this.router.post("/items", authorizationMiddleware(
            {
                model: this.itemsModel.itemModel,
                roles: ["global-manager", "manager"]
            }
        ), this.itemsLogic.create);

        this.router.get("/items", this.itemsLogic.read);

        this.router.put("/items", authorizationMiddleware(
            {
                model: this.itemsModel.itemModel,
                roles: ["global-manager", "manager"]
            }
        ), this.itemsLogic.update);

        this.router.delete("/items", authorizationMiddleware(
            {
                model: this.itemsModel.itemModel,
                roles: ["global-manager", "manager"]
            }
        ), this.itemsLogic.delete);

        return ItemsRoutes.name;
    }
}
