import { Document, Model, model, Schema } from "mongoose";
import { Event } from "seamless-injector";
import { canUserAccess } from "../handlers/can-user-access.handler";
import { ICollection } from "./interfaces/collection";

export interface ICollectionModel extends ICollection, Document {
    id: string;
}

@Event("SingletonPattern")
export class CollectionsModel {
    public collectionModel: Model<ICollectionModel>;

    constructor() {

        const CollectionSchema: Schema = new Schema({
            name: String
        });

        CollectionSchema.statics.allowAccess = (payload: any, groupId: string): any => {
            return new Promise((res, reject) => {
                const { id } = payload;
                const isAllowed = canUserAccess(id, groupId);
                res(isAllowed);
            });
        };

        this.collectionModel = model<ICollectionModel>("Collection", CollectionSchema);
    }
}
