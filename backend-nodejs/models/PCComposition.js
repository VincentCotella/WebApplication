"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../database/sequelize"));
const PC_1 = __importDefault(require("./PC"));
const Items_1 = __importDefault(require("./Items"));
class PCComposition extends sequelize_1.Model {
}
PCComposition.init({
    PCId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PC_1.default,
            key: 'PCId',
        },
    },
    itemId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Items_1.default,
            key: 'itemId',
        },
    },
    quantityItem: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: 'PCComposition',
    modelName: 'PCComposition',
    timestamps: false,
});
exports.default = PCComposition;
