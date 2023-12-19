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
const OrdersPC_1 = __importDefault(require("../models/OrdersPC"));
const PC_1 = __importDefault(require("../models/PC"));
const orderPCRoutes = express_1.default.Router();
// Create a new order PC
orderPCRoutes.post('/ordersPCs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrderPC = yield OrdersPC_1.default.create(req.body);
        res.status(201).json(newOrderPC);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Get all order PCs
orderPCRoutes.get('/ordersPCs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderPCs = yield OrdersPC_1.default.findAll();
        res.json(orderPCs);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Get order PCs for a specific order ID
orderPCRoutes.get('/orders/:orderId/pcs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = parseInt(req.params['orderId'], 10);
    try {
        const orderPCs = yield OrdersPC_1.default.findAll({
            where: { ordersId: orderId },
            include: [PC_1.default],
        });
        res.json(orderPCs);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Update an order PC by ID
orderPCRoutes.put('/ordersPCs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderPCId = parseInt(req.params['id'], 10);
    try {
        const orderPC = yield OrdersPC_1.default.findByPk(orderPCId);
        if (orderPC) {
            yield orderPC.update(req.body);
            res.json(orderPC);
        }
        else {
            res.status(404).json({ error: 'Order PC not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Delete an order PC by ID
orderPCRoutes.delete('/ordersPCs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderPCId = parseInt(req.params['id'], 10);
    try {
        const orderPC = yield OrdersPC_1.default.findByPk(orderPCId);
        if (orderPC) {
            yield orderPC.destroy();
            res.json({ message: 'Order PC deleted successfully' });
        }
        else {
            res.status(404).json({ error: 'Order PC not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = orderPCRoutes;
