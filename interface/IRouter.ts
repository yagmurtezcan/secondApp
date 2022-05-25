import express from "express";

export default interface IRouterBase {
    router: express.Router;
    routes(): any;
}

