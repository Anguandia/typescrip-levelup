import { Express } from "express";
import { stockRoutes } from './stock.routes';
import { userRoutes } from './user.routes';
export const register = (app: Express) => {

    stockRoutes(app);
    userRoutes(app);

};
