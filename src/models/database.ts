import mongoose from "mongoose";
import { Event, Getter } from "seamless-injector";

@Event("SingletonPattern")
export class Database {
    public mongooseInstance: any;
    constructor() {
        this.mongooseInstance = mongoose
            .connect("<CONNECTION_STRING>",
                { useNewUrlParser: true });
    }
}
