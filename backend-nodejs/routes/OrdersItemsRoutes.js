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
const OrdersItems_1 = __importDefault(require("../models/OrdersItems"));
const Items_1 = __importDefault(require("../models/Items"));
const ordersItemsRoutes = express_1.default.Router();
// Create a new order item
ordersItemsRoutes.post('/ordersItems', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrderItem = yield OrdersItems_1.default.create(req.body);
        res.status(201).json(newOrderItem);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Get all order items
ordersItemsRoutes.get('/ordersItems', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderItems = yield OrdersItems_1.default.findAll();
        res.json(orderItems);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Get order items for a specific order ID
ordersItemsRoutes.get('/orders/:orderId/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = parseInt(req.params['orderId'], 10);
    try {
        const orderItems = yield OrdersItems_1.default.findAll({
            where: { ordersId: orderId },
            include: [Items_1.default],
        });
        res.json(orderItems);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Update an order item by ID
ordersItemsRoutes.put('/ordersItems/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderItemId = parseInt(req.params['id'], 10);
    try {
        const orderItem = yield OrdersItems_1.default.findByPk(orderItemId);
        if (orderItem) {
            yield orderItem.update(req.body);
            res.json(orderItem);
        }
        else {
            res.status(404).json({ error: 'Order item not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Delete an order item by ID
ordersItemsRoutes.delete('/ordersItems/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderItemId = parseInt(req.params['id'], 10);
    try {
        const orderItem = yield OrdersItems_1.default.findByPk(orderItemId);
        if (orderItem) {
            yield orderItem.destroy();
            res.json({ message: 'Order item deleted successfully' });
        }
        else {
            res.status(404).json({ error: 'Order item not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = ordersItemsRoutes;
