"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizeSync_1 = __importDefault(require("./sequelizeSync"));
const LearningPackage_1 = __importDefault(require("./LearningPackage"));
class LearningFact extends sequelize_1.Model {
}
LearningFact.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    id_LearningPackage: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: LearningPackage_1.default,
            key: 'id', // Refer to the 'id' column of the LearningPackage model
        },
    },
    disabled: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Set the default value to false
    },
}, {
    sequelize: sequelizeSync_1.default,
    tableName: 'LearningFact',
    modelName: 'LearningFact',
    timestamps: false, // Désactive les timestamps createdAt et updatedAt
});
exports.default = LearningFact;
