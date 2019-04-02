import { Document, Model, model, Schema } from "mongoose";
import * as mongoose from "mongoose";
import { Event } from "seamless-injector";
import { canUserAccess } from "../handlers/can-user-access.handler";
import { IItem } from "./interfaces/item";

export interface IItemModel extends IItem, Document {
    id: string;
}

@Event("SingletonPattern")
export class ItemsModel {
    public itemModel: Model<IItemModel>;

    constructor() {

        const ItemSchema: Schema = new Schema({
            name: String,
            parentId: {
                ref: "Collection",
                type: mongoose.Schema.Types.ObjectId
            }
        });

        ItemSchema.statics.allowAccess = (payload: any, groupId: string): any => {
            return new Promise((res, reject) => {
                const { parentId } = payload;
                const isAllowed = canUserAccess(parentId, groupId);
                res(isAllowed);
            });
        };

        this.itemModel = model<IItemModel>("Item", ItemSchema);
    }
}
