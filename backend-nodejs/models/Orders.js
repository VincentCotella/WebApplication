"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../database/sequelize"));
const Users_1 = __importDefault(require("./Users"));
const PaymentMethods_1 = __importDefault(require("./PaymentMethods"));
class Orders extends sequelize_1.Model {
}
Orders.init({
    ordersId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orderDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    totalAmount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    shippingAddress: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    paymentMethodsId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: PaymentMethods_1.default,
            key: 'paymentMethodsId',
        },
    },
    usersId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Users_1.default,
            key: 'usersId',
        },
    },
}, {
    sequelize: sequelize_2.default,
    tableName: 'Orders',
    modelName: 'Orders',
    timestamps: false,
});
exports.default = Orders;
