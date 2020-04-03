import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/db";

export interface Iuser {
  firstName: string;
  lastName: string;
  otherNames?: string;
  email: string;
  password: string;
  image?: string;
  role: string;
}

export class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public otherNames?: string;
  public email!: string;
  public password!: string;
  public image?: string;
  public role!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    lastName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    otherNames: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    image: {
      type: new DataTypes.STRING(128),
      allowNull: true
    },
    role: {
      type: new DataTypes.STRING(128),
      defaultValue: 'client',
      // allowNull: false,
    }
  },
  {
    tableName: "users",
    sequelize: database
  }
);
// tslint:disable-next-line:no-console
User.sync({}).then(() => console.log("Users table created"));