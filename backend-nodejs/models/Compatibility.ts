import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';
import Items from './Items';

class Compatibility extends Model {
  public itemId!: number;
  public compatibleWithItemId!: number;
}

Compatibility.init(
  {
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Items,
        key: 'itemId',
      },
    },
    compatibleWithItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Items,
        key: 'itemId',
      },
    },
  },
  {
    sequelize,
    tableName: 'Compatibility',
    modelName: 'Compatibility',
    timestamps: false,
  }
);

export default Compatibility;
