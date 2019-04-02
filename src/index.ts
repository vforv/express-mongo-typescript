import { Getter } from "seamless-injector";
import "./provider";
import { Server } from "./server";

const instance = Getter<Server>("Server");
const app = instance.getApp();

app.listen(3000, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server running on port 3000`);
});
