import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';

class PaymentMethods extends Model {
  public paymentMethodsId!: number;
  public name!: string;
}

PaymentMethods.init(
  {
    paymentMethodsId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'PaymentMethods',
    modelName: 'PaymentMethods',
    timestamps: false,
  }
);

export default PaymentMethods;
