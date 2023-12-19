"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsersPaymentMethod_1 = __importDefault(require("../models/UsersPaymentMethod"));
const PaymentMethods_1 = __importDefault(require("../models/PaymentMethods"));
const usersPaymentMethodRoutes = express_1.default.Router();
// Create a new user payment method
usersPaymentMethodRoutes.post('/usersPaymentMethods', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUserPaymentMethod = yield UsersPaymentMethod_1.default.create(req.body);
        res.status(201).json(newUserPaymentMethod);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Get all user payment methods
usersPaymentMethodRoutes.get('/usersPaymentMethods', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPaymentMethods = yield UsersPaymentMethod_1.default.findAll();
        res.json(userPaymentMethods);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Get user payment methods for a specific user ID
usersPaymentMethodRoutes.get('/users/:userId/paymentMethods', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params['userId'], 10);
    try {
        const userPaymentMethods = yield UsersPaymentMethod_1.default.findAll({
            where: { usersId: userId },
            include: [PaymentMethods_1.default],
        });
        res.json(userPaymentMethods);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Update a user payment method by ID
usersPaymentMethodRoutes.put('/usersPaymentMethods/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userPaymentMethodId = parseInt(req.params['id'], 10);
    try {
        const userPaymentMethod = yield UsersPaymentMethod_1.default.findByPk(userPaymentMethodId);
        if (userPaymentMethod) {
            yield userPaymentMethod.update(req.body);
            res.json(userPaymentMethod);
        }
        else {
            res.status(404).json({ error: 'User payment method not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Delete a user payment method by ID
usersPaymentMethodRoutes.delete('/usersPaymentMethods/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userPaymentMethodId = parseInt(req.params['id'], 10);
    try {
        const userPaymentMethod = yield UsersPaymentMethod_1.default.findByPk(userPaymentMethodId);
        if (userPaymentMethod) {
            yield userPaymentMethod.destroy();
            res.json({ message: 'User payment method deleted successfully' });
        }
        else {
            res.status(404).json({ error: 'User payment method not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = usersPaymentMethodRoutes;
