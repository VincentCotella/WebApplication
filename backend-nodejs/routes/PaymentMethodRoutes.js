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
const PaymentMethods_1 = __importDefault(require("../models/PaymentMethods"));
const paymentMethodRoutes = express_1.default.Router();
// Create a new payment method
paymentMethodRoutes.post('/paymentMethods', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPaymentMethod = yield PaymentMethods_1.default.create(req.body);
        res.status(201).json(newPaymentMethod);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Get all payment methods
paymentMethodRoutes.get('/paymentMethods', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentMethods = yield PaymentMethods_1.default.findAll();
        res.json(paymentMethods);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Get a specific payment method by ID
paymentMethodRoutes.get('/paymentMethods/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentMethodId = parseInt(req.params['id'], 10);
    try {
        const paymentMethod = yield PaymentMethods_1.default.findByPk(paymentMethodId);
        if (paymentMethod) {
            res.json(paymentMethod);
        }
        else {
            res.status(404).json({ error: 'Payment method not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Update a payment method by ID
paymentMethodRoutes.put('/paymentMethods/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentMethodId = parseInt(req.params['id'], 10);
    try {
        const paymentMethod = yield PaymentMethods_1.default.findByPk(paymentMethodId);
        if (paymentMethod) {
            yield paymentMethod.update(req.body);
            res.json(paymentMethod);
        }
        else {
            res.status(404).json({ error: 'Payment method not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Delete a payment method by ID
paymentMethodRoutes.delete('/paymentMethods/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentMethodId = parseInt(req.params['id'], 10);
    try {
        const paymentMethod = yield PaymentMethods_1.default.findByPk(paymentMethodId);
        if (paymentMethod) {
            yield paymentMethod.destroy();
            res.json({ message: 'Payment method deleted successfully' });
        }
        else {
            res.status(404).json({ error: 'Payment method not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = paymentMethodRoutes;
