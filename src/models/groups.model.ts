import { Document, Model, model, Schema } from "mongoose";
import * as mongoose from "mongoose";
import { Event } from "seamless-injector";
import { IGroup } from "./interfaces/group";

export interface IGroupModel extends IGroup, Document {
    id: string;
    collections: string[];
}

@Event("SingletonPattern")
export class GroupsModel {
    public groupModel: Model<IGroupModel>;

    constructor() {

        const GroupSchema: Schema = new Schema({
            collectionIds: [{
                ref: "Collection",
                type: mongoose.Schema.Types.ObjectId
            }],
            name: String
        });

        this.groupModel = model<IGroupModel>("Group", GroupSchema);
    }
}
