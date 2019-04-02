import express from "express";
import { Event, Getter } from "seamless-injector";
import { requestHandler } from "../handlers/request.handler";
import { CollectionsModel } from "./../models/collections.model";

@Event("DefaultPattern")
export class CollectionsLogic {
    public create(req: express.Request, res: express.Response) {
        const collection = Getter<CollectionsModel>("CollectionsModel");
        const dbRequest = collection.collectionModel.create(req.body);
        return requestHandler(req, res, dbRequest);
    }

    public read(req: express.Request, res: express.Response) {
        const collection = Getter<CollectionsModel>("CollectionsModel");
        const dbRequest = collection.collectionModel.find({});
        return requestHandler(req, res, dbRequest);
    }

    public update(req: express.Request, res: express.Response) {
        const { id, ...payload } = req.body;
        const collection = Getter<CollectionsModel>("CollectionsModel");
        const dbRequest = collection.collectionModel.findOneAndUpdate(id, payload,
            { new: true, upsert: false, setDefaultsOnInsert: true });
        return requestHandler(req, res, dbRequest);
    }

    public delete(req: express.Request, res: express.Response) {
        const { id } = req.body;
        const collection = Getter<CollectionsModel>("CollectionsModel");
        const dbRequest = collection.collectionModel.findByIdAndRemove(id);
        return requestHandler(req, res, dbRequest);
    }
}
