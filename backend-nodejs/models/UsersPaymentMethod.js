"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../database/sequelize"));
const Users_1 = __importDefault(require("./Users"));
const PaymentMethods_1 = __importDefault(require("./PaymentMethods"));
class UsersPaymentMethod extends sequelize_1.Model {
}
UsersPaymentMethod.init({
    usersId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users_1.default,
            key: 'usersId',
        },
    },
    paymentMethodsUser: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PaymentMethods_1.default,
            key: 'paymentMethodsId',
        },
    },
    details: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: 'UsersPaymentMethod',
    modelName: 'UsersPaymentMethod',
    timestamps: false,
});
exports.default = UsersPaymentMethod;
