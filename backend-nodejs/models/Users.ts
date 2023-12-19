import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';

class Users extends Model {
  public usersId!: number;
  public username!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phoneNumber!: string | null;
  public address!: string | null;
}

Users.init(
  {
    usersId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Users',
    modelName: 'Users',
    timestamps: false,
  }
);

export default Users;
