import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';
import User from './Users';
import PaymentMethods from './PaymentMethods';

class UsersPaymentMethod extends Model {
  public usersId!: number;
  public paymentMethodsUser!: number;
  public details!: string | null;
}

UsersPaymentMethod.init(
  {
    usersId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'usersId',
      },
    },
    paymentMethodsUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PaymentMethods,
        key: 'paymentMethodsId',
      },
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'UsersPaymentMethod',
    modelName: 'UsersPaymentMethod',
    timestamps: false,
  }
);

export default UsersPaymentMethod;
