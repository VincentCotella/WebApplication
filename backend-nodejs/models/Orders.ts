import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';
import User from './Users';
import PaymentMethods from './PaymentMethods';

class Orders extends Model {
  public ordersId!: number;
  public orderDate!: Date;
  public totalAmount!: number;
  public shippingAddress!: string;
  public status!: string;
  public paymentMethodsId!: number | null;
  public usersId!: number | null;
}

Orders.init(
  {
    ordersId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    shippingAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentMethodsId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: PaymentMethods,
        key: 'paymentMethodsId',
      },
    },
    usersId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: 'usersId',
      },
    },
  },
  {
    sequelize,
    tableName: 'Orders',
    modelName: 'Orders',
    timestamps: false,
  }
);

export default Orders;
