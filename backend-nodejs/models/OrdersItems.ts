import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';
import Orders from './Orders';
import Items from './Items';

class OrdersItems extends Model {
  public ordersId!: number;
  public itemsId!: number;
  public quantity!: number;
}

OrdersItems.init(
  {
    ordersId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Orders,
        key: 'ordersId',
      },
    },
    itemsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Items,
        key: 'itemId',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'OrdersItems',
    modelName: 'OrdersItems',
    timestamps: false,
  }
);

export default OrdersItems;
