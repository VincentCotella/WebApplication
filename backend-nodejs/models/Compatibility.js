"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../database/sequelize"));
const Items_1 = __importDefault(require("./Items"));
class Compatibility extends sequelize_1.Model {
}
Compatibility.init({
    itemId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Items_1.default,
            key: 'itemId',
        },
    },
    compatibleWithItemId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Items_1.default,
            key: 'itemId',
        },
    },
}, {
    sequelize: sequelize_2.default,
    tableName: 'Compatibility',
    modelName: 'Compatibility',
    timestamps: false,
});
exports.default = Compatibility;
