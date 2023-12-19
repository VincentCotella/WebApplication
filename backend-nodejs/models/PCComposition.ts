import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';
import PC from './PC';
import Items from './Items';

class PCComposition extends Model {
  public PCId!: number;
  public itemId!: number;
  public quantityItem!: number;
}

PCComposition.init(
  {
    PCId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PC,
        key: 'PCId',
      },
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Items,
        key: 'itemId',
      },
    },
    quantityItem: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'PCComposition',
    modelName: 'PCComposition',
    timestamps: false,
  }
);

export default PCComposition;
