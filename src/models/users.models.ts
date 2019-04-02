import { Document, Model, model, Schema } from "mongoose";
import { Event } from "seamless-injector";
import { IUser } from "./interfaces/user";

export interface IUserModel extends IUser, Document {
    id: string;
}

@Event("SingletonPattern")
export class UsersModel {
    public userModel: Model<IUserModel>;

    constructor() {
        const RoleSchema: Schema = new Schema({
            groupId: String,
            role: {
                enum: ["regular", "manager", "global-manager"],
                type: String
            } // valid: 'regular', 'manager', 'globalManager'
        });

        const UserSchema: Schema = new Schema({
            email: String,
            roles: [RoleSchema]
        });

        UserSchema.statics.allowAccess = (payload: any, groupId: string): any => {

            return new Promise((res, reject) => {
                const { roles, id } = payload;
                if (!roles && !id) {
                    return res(false);
                }

                // in case when we don't have roles just id of entity
                // ex delete user
                if (!roles && id) {
                    return model("User")
                        .findById(id)
                        .then((user: any) => {
                            if (!user) {
                                return res(false);
                            }
                            return res(this.isGroupIdSame(user.roles, groupId));
                        });
                }

                return res(this.isGroupIdSame(roles, groupId));
            });

        };

        this.userModel = model<IUserModel>("User", UserSchema);
    }

    /**
     * Compare group id on payload and
     * group id which user(editor) belongs
     *
     * @param fromUserRoles this is from payload or from query to db
     * @param groupId Group id which edior belongs
     */
    private isGroupIdSame(fromUserRoles: any, groupId: any) {
        for (const role of fromUserRoles) {
            if (role.groupId !== groupId) {
                return false;
            }

            if (role.role === "global-manager") {
                return false;
            }
        }

        return true;
    }
}
