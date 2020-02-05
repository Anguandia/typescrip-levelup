import { Request, Response } from "express";
import { Stock, StockInterface } from "../db/models/stock";
import { where } from "sequelize/types";

export class StockController {

  public findItemById(req: Request, res: Response) {
    const { id } = req.params;
    Stock.findByPk<Stock>(id)
      .then((item) => res.status(200).json({
        message: `${item.quantity} pieces of Item ${item.name} found`,
        data: item,
      }));
  }

  public allStock(req: Request, res: Response) {
    Stock.findAll<Stock>({})
      .then((stocks: Stock[]) => res.status(200).json({
        message: `${stocks.length} items found`,
        data: stocks
      }))
      .catch((err: Error) => res.status(500).json({
        error: 'operation failed',
      }));
  }

  public create(req: Request, res: Response) {
    const params: StockInterface = req.body;
    Stock.create<Stock>(params)
      .then((stock: Stock) => res.status(201).json({
          message: `item ${stock.name} added`,
          item: stock
        }))
      .catch((err: Error) => res.status(500).json({
        error: 'failed to create item'
      }));
  }

  public updateItem(req: Request, res: Response) {
    const { params: { id }, body } = req;
    Stock.update(body, { where: { id } })
      .then(() => res.status(200).json({ message: 'update successful' }))
      .catch((e) => res.status(500).json({error: 'update failed'}));
  }

  public deleteItem(req: Request, res: Response) {
    const { params: { id } } = req;
    Stock.destroy({ where: { id } })
      .then((del) => del !== 0
        ? res.status(200).json({ message: 'successfully deleted' })
        : res.status(400).json({error: 'not deleted'}))
      .catch((e) => res.status(500).json(e));
  }
}

export default new StockController();