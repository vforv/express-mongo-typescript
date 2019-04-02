import to from "await-to-js";
import express from "express";
import * as httpStatus from "http-status";

export async function requestHandler(req: express.Request, res: express.Response, forHandling: any) {
    const [err, data] = await to(forHandling);
    if (!err) {
        return res.json(data);
    }

    return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(err);
}
