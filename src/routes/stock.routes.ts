import * as express from "express";
import StockController from '../controllers/stock.controller';
import { auth } from '../middleware/auth';

const { general, admin } = auth;

export const stockRoutes = (app: express.Application) => {

    app.get("/stock/:id", StockController.findItemById);
    app.put("/stock/:id", StockController.updateItem);
    app.delete("/stock/:id", StockController.deleteItem);
    app.get("/stock", general, admin, StockController.allStock);
    app.post("/stock", StockController.create);

};