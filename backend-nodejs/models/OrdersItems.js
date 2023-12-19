"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../database/sequelize"));
const Orders_1 = __importDefault(require("./Orders"));
const Items_1 = __importDefault(require("./Items"));
class OrdersItems extends sequelize_1.Model {
}
OrdersItems.init({
    ordersId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Orders_1.default,
            key: 'ordersId',
        },
    },
    itemsId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Items_1.default,
            key: 'itemId',
        },
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: 'OrdersItems',
    modelName: 'OrdersItems',
    timestamps: false,
});
exports.default = OrdersItems;
