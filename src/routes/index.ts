import * as express from "express";
import StockController from '../controllers/stock.controller'

export const register = (app: express.Application) => {

    app.get("/stock/:id", (StockController.findItemById));
    app.put("/stock/:id", (StockController.updateItem));
    app.delete("/stock/:id", (StockController.deleteItem));
    app.get("/stock", StockController.allStock);
    app.post("/stock", StockController.create);

};
