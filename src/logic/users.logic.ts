import { ObjectID } from "bson";
import express from "express";
import { Event, Getter } from "seamless-injector";
import { requestHandler } from "../handlers/request.handler";
import { UsersModel } from "./../models/users.models";

@Event("DefaultPattern")
export class UsersLogic {
    public create(req: express.Request, res: express.Response) {
        const user = Getter<UsersModel>("UsersModel");
        const dbRequest = user.userModel.create(req.body);
        return requestHandler(req, res, dbRequest);
    }

    public read(req: express.Request, res: express.Response) {
        const user = Getter<UsersModel>("UsersModel");
        const dbRequest = user.userModel.find({});
        return requestHandler(req, res, dbRequest);
    }

    public update(req: express.Request, res: express.Response) {
        const { id, ...payload } = req.body;
        const user = Getter<UsersModel>("UsersModel");
        const dbRequest = user.userModel.findOneAndUpdate(id, payload,
            { new: true, upsert: false, setDefaultsOnInsert: true });
        return requestHandler(req, res, dbRequest);
    }

    public delete(req: express.Request, res: express.Response) {
        const { id } = req.body;
        const user = Getter<UsersModel>("UsersModel");
        const dbRequest = user.userModel.findByIdAndRemove(id);
        return requestHandler(req, res, dbRequest);
    }
}
