import express from "express";
import { Getter } from "seamless-injector";
import { authorizationMiddleware } from "../../middlewares/authorization.middleware";
import { GroupsLogic } from "./../../logic/groups.logic";

export class GroupsRoutes {
    public groupsLogic: GroupsLogic;

    constructor(private router: express.Router) {
        this.groupsLogic = Getter<GroupsLogic>("GroupsLogic");
    }

    public registerRoutes() {
        this.router.post("/groups", authorizationMiddleware(
            {
                model: null,
                roles: ["global-manager"]
            }
        ), this.groupsLogic.create);

        this.router.get("/groups", this.groupsLogic.read);

        this.router.put("/groups", authorizationMiddleware(
            {
                model: null,
                roles: ["global-manager"]
            }
        ), this.groupsLogic.update);

        this.router.delete("/groups", authorizationMiddleware(
            {
                model: null,
                roles: ["global-manager"]
            }
        ), this.groupsLogic.delete);

        return GroupsRoutes.name;
    }
}
