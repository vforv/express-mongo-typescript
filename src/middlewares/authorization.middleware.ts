import to from "await-to-js";
import express from "express";
import * as Status from "http-status";
import { Getter } from "seamless-injector";
import { UsersModel } from "./../models/users.models";

/**
 * For purpose of PoC I put in variable editor
 * user id which sending request it can be jwt, session or some other
 * kind user indetification
 *
 * @param param0 role is for user role model is db model
 */
export function authorizationMiddleware({ roles, model }: { roles: string[], model: any }) {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { editor } = req.body;
        const userModel = Getter<UsersModel>("UsersModel");
        // Get user who editing
        const [error, user] = await to(userModel.userModel.findById(editor).exec());
        if (!user) {
            return res
                .status(Status.UNAUTHORIZED)
                .json({ error: "Do not have access." });
        }
        if (!error) {
            // Get roles from that users and compare with roles on the route
            const intersection = user.roles.filter((element) => roles.includes(element.role));
            // If role not found block access
            if (!intersection) {
                return res
                    .status(Status.UNAUTHORIZED)
                    .json({ error: "Do not have access." });
            }

            // If roles found
            for (const role of intersection) {
                // check first if user is general manager
                // if yes allow req
                if (!role.groupId) {
                    return next();
                } else {
                    if (!model) {
                        return next();
                    }
                    // check on the model if user is allowed to make change
                    const [err, isAlowed] = await to(model.allowAccess(req.body, role.groupId));

                    if (!err && isAlowed) {
                        return next();
                    }
                }
            }
            return res
                .status(Status.UNAUTHORIZED)
                .json({ error: "Do not have access." });
        }
    };
}
