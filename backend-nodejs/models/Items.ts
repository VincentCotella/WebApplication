import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';

class Items extends Model {
  public itemId!: number;
  public productName!: string;
  public price!: number;
  public description!: string | null;
  public stockQuantity!: number;
  public type!: string;
}

Items.init(
  {
    itemId: {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['CPU', 'GPU', 'Motherboard', 'CPU Cooler', 'SSD', 'RAM', 'Power Supply']],
      },
    },
  },
  {
    sequelize,
    tableName: 'Items',
    modelName: 'Items',
    timestamps: false,
  }
);

export default Items;
