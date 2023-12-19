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
const Orders_1 = __importDefault(require("../models/Orders"));
const ordersRoutes = express_1.default.Router();
// Create a new order
ordersRoutes.post('/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = yield Orders_1.default.create(req.body);
        res.status(201).json(newOrder);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Get all orders
ordersRoutes.get('/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Orders_1.default.findAll();
        res.json(orders);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Get a specific order by ID
ordersRoutes.get('/orders/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = parseInt(req.params['id'], 10);
    try {
        const order = yield Orders_1.default.findByPk(orderId);
        if (order) {
            res.json(order);
        }
        else {
            res.status(404).json({ error: 'Order not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Update an order by ID
ordersRoutes.put('/orders/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = parseInt(req.params['id'], 10);
    try {
        const order = yield Orders_1.default.findByPk(orderId);
        if (order) {
            yield order.update(req.body);
            res.json(order);
        }
        else {
            res.status(404).json({ error: 'Order not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Delete an order by ID
ordersRoutes.delete('/orders/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = parseInt(req.params['id'], 10);
    try {
        const order = yield Orders_1.default.findByPk(orderId);
        if (order) {
            yield order.destroy();
            res.json({ message: 'Order deleted successfully' });
        }
        else {
            res.status(404).json({ error: 'Order not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = ordersRoutes;
