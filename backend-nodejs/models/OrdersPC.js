"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../database/sequelize"));
const Orders_1 = __importDefault(require("./Orders"));
const PC_1 = __importDefault(require("./PC"));
class OrdersPC extends sequelize_1.Model {
}
OrdersPC.init({
    ordersId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Orders_1.default,
            key: 'ordersId',
        },
    },
    PCId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PC_1.default,
            key: 'PCId',
        },
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: 'OrdersPC',
    modelName: 'OrdersPC',
    timestamps: false,
});
exports.default = OrdersPC;
