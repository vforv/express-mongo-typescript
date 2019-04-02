import express from "express";
import { Getter } from "seamless-injector";
import { UsersLogic } from "../../logic/users.logic";
import { authorizationMiddleware } from "../../middlewares/authorization.middleware";
import { UsersModel } from "./../../models/users.models";

export class UsersRoutes {
    public usersLogic: UsersLogic;
    public usersModel: UsersModel;

    constructor(private router: express.Router) {
        this.usersLogic = Getter<UsersLogic>("UsersLogic");
        this.usersModel = Getter<UsersModel>("UsersModel");
    }

    public registerRoutes() {
        this.router.post("/users", authorizationMiddleware(
            {
                model: this.usersModel.userModel,
                roles: ["global-manager", "manager"]
            }
        ), this.usersLogic.create);

        this.router.get("/users", this.usersLogic.read);

        this.router.put("/users", authorizationMiddleware(
            {
                model: this.usersModel.userModel,
                roles: ["global-manager", "manager"]
            }
        ), this.usersLogic.update);

        this.router.delete("/users", authorizationMiddleware(
            {
                model: this.usersModel.userModel,
                roles: ["global-manager", "manager"]
            }
        ), this.usersLogic.delete);

        return UsersRoutes.name;
    }
}
