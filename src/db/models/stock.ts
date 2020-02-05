import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/db";

export interface StockInterface {
  name: string;
  quantity?: number;
  unitPrice?: string;
  image?: string;
}

export class Stock extends Model {
  public id!: number;
  public name!: string;
  public quantity?: number;
  public unitPrice?: string;
  public image?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Stock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    unitPrice: {
      type: new DataTypes.STRING(128),
      allowNull: true
    },
    image: {
      type: new DataTypes.STRING(128),
      allowNull: true
    }
  },
  {
    tableName: "stoks",
    sequelize: database
  }
);
// tslint:disable-next-line:no-console
Stock.sync({}).then(() => console.log("Stock table created"));