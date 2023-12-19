import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';

class PC extends Model {
  public PCId!: number;
  public productName!: string;
  public price!: number;
  public type!: string;
  public stockQuantity!: number;
}

PC.init(
  {
    PCId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Custom', 'Standard']],
      },
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'PC',
    modelName: 'PC',
    timestamps: false,
  }
);

export default PC;
