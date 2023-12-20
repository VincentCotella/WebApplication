import {DataTypes, Model} from "sequelize";
import sequelize from '../database/sequelize';
import LearningPackage from "./LearningPackage";
class LearningFact extends Model {
    public learningFactId!: number;
    public title!: string;
    public content!: string;
    public learningPackageId!:number;
    public disabled!: boolean;
}

LearningFact.init(
    {
        learningFactId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        learningPackageId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: LearningPackage, // Refer to the LearningPackage model
                key: 'learningPackageId', // Refer to the 'id' column of the LearningPackage model
            },
        },
    },
    {
        sequelize,
        tableName: 'LearningFact', // Assurez-vous que cela correspond au nom de la table dans votre base de données
        modelName: 'LearningFact',
        timestamps: false, // Désactive les timestamps createdAt et updatedAt
    }
);

LearningPackage.hasMany(LearningFact, { foreignKey: 'learningPackageId', onDelete: 'CASCADE' });
LearningFact.belongsTo(LearningPackage, { foreignKey: 'learningPackageId' });

export default LearningFact;