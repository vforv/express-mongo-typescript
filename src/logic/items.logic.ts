import express from "express";
import { Event, Getter } from "seamless-injector";
import { requestHandler } from "../handlers/request.handler";
import { ItemsModel } from "./../models/items.model";

@Event("DefaultPattern")
export class ItemsLogic {
    public create(req: express.Request, res: express.Response) {
        const item = Getter<ItemsModel>("ItemsModel");
        const dbRequest = item.itemModel.create(req.body);
        return requestHandler(req, res, dbRequest);
    }

    public read(req: express.Request, res: express.Response) {
        const item = Getter<ItemsModel>("ItemsModel");
        const dbRequest = item.itemModel.find({});
        return requestHandler(req, res, dbRequest);
    }

    public update(req: express.Request, res: express.Response) {
        const { id, ...payload } = req.body;
        const item = Getter<ItemsModel>("ItemsModel");
        const dbRequest = item.itemModel.findOneAndUpdate(id, payload,
            { new: true, upsert: false, setDefaultsOnInsert: true });
        return requestHandler(req, res, dbRequest);
    }

    public delete(req: express.Request, res: express.Response) {
        const { id } = req.body;
        const item = Getter<ItemsModel>("ItemsModel");
        const dbRequest = item.itemModel.findByIdAndRemove(id);
        return requestHandler(req, res, dbRequest);
    }
}
