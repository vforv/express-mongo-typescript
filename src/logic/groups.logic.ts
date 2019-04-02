import express from "express";
import { Event, Getter } from "seamless-injector";
import { requestHandler } from "../handlers/request.handler";
import { GroupsModel } from "./../models/groups.model";

@Event("DefaultPattern")
export class GroupsLogic {
    public create(req: express.Request, res: express.Response) {
        const group = Getter<GroupsModel>("GroupsModel");
        const dbRequest = group.groupModel.create(req.body);
        return requestHandler(req, res, dbRequest);
    }

    public read(req: express.Request, res: express.Response) {
        const group = Getter<GroupsModel>("GroupsModel");
        const dbRequest = group.groupModel.find({});
        return requestHandler(req, res, dbRequest);
    }

    public update(req: express.Request, res: express.Response) {
        const { id, ...payload } = req.body;
        const group = Getter<GroupsModel>("GroupsModel");
        const dbRequest = group.groupModel.findOneAndUpdate(id, payload,
            { new: true, upsert: false, setDefaultsOnInsert: true });
        return requestHandler(req, res, dbRequest);
    }

    public delete(req: express.Request, res: express.Response) {
        const { id } = req.body;
        const group = Getter<GroupsModel>("GroupsModel");
        const dbRequest = group.groupModel.findByIdAndRemove(id);
        return requestHandler(req, res, dbRequest);
    }
}
