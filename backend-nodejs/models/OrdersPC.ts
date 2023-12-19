import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';
import Orders from './Orders';
import PC from './PC';

class OrdersPC extends Model {
  public ordersId!: number;
  public PCId!: number;
  public quantity!: number;
}

OrdersPC.init(
  {
    ordersId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Orders,
        key: 'ordersId',
      },
    },
    PCId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PC,
        key: 'PCId',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'OrdersPC',
    modelName: 'OrdersPC',
    timestamps: false,
  }
);

export default OrdersPC;
