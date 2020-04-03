import { Request, Response } from "express";
import { Stock, StockInterface } from "../db/models/stock";
import { where } from "sequelize/types";

export class StockController {

  public findItemById(req: Request, res: Response) {
    const { id } = req.params;
    Stock.findByPk<Stock>(id)
      .then((item) => {
        if (item) {
          res.status(200).json({
            message: `${item.quantity} pieces of Item ${item.name} found`,
            data: item,
          })
        }
        else res.status(404).json({ error: 'item not found' })
      }
      );
  }

  public allStock(req: Request, res: Response) {
    console.log(req.body);
    Stock.findAll<Stock>({order: [['createdAt', 'DESC']]})
      .then((stocks: Stock[]) => res.status(200).json({
        message: `${stocks.length} items found`,
        data: stocks
      }))
      .catch((err: Error) => res.status(500).json({
        err,
        error: 'operation failed',
      }));
  }

  public async create(req: Request, res: Response) {
    // let data: Stock;
    // let message: string;
    const params: StockInterface = req.body;
    const existing: any = await Stock.findOne<Stock>({ where: { name: params.name } })
    // .then((e:any) => Promise.resolve(e));
    // console.log(params, existing);
    existing
      ? res.status(400).json({
        error: `item ${existing.dataValues.name} exists`,
        data: existing
      })
      : Stock.create<Stock>(params)
        .then((stock: Stock) => res.status(201).json({
          message: `item ${stock.name} added`,
          data: stock
        }))
        .catch((err: Error) => res.status(500).json({
          error: 'failed to create item'
        }));
  }

  public async updateItem(req: Request, res: Response) {
    const { params: { id }, body } = req;
    const existing = await Stock.findByPk(id);
    Stock.update(body, { where: { id }, returning: true })
      .then((resp) => res.status(200).json({ message: `Item ${existing.name} updated`, data: resp[1][0] }))
      .catch((e) => res.status(500).json({ error: 'update failed' }));
  }

  public deleteItem(req: Request, res: Response) {
    const { params: { id } } = req;
    Stock.destroy({ where: { id } })
      .then((del) => del !== 0
        ? res.status(200).json({ message: 'successfully deleted' })
        : res.status(400).json({ error: 'not deleted' }))
      .catch((e) => res.status(500).json({error: 'internal error'}));
  }
}

export default new StockController();