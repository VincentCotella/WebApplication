"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizeSync_1 = __importDefault(require("./sequelizeSync"));
class LearningPackage extends sequelize_1.Model {
}
LearningPackage.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    targetAudience: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    difficultyLevel: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    disabled: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Set the default value to false
    },
}, {
    sequelize: sequelizeSync_1.default,
    tableName: 'LearningPackage',
    modelName: 'LearningPackage',
    timestamps: false, // Désactive les timestamps createdAt et updatedAt
});
exports.default = LearningPackage;
