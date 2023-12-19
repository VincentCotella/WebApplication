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
const Items_1 = __importDefault(require("../models/Items"));
const itemsRoutes = express_1.default.Router();
// Create a new item
itemsRoutes.post('/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newItem = yield Items_1.default.create(req.body);
        res.status(201).json(newItem);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Get all items
itemsRoutes.get('/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield Items_1.default.findAll();
        res.json(items);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Get a specific item by ID
itemsRoutes.get('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = parseInt(req.params['id'], 10);
    try {
        const item = yield Items_1.default.findByPk(itemId);
        if (item) {
            res.json(item);
        }
        else {
            res.status(404).json({ error: 'Item not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Update an item by ID
itemsRoutes.put('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = parseInt(req.params['id'], 10);
    try {
        const item = yield Items_1.default.findByPk(itemId);
        if (item) {
            yield item.update(req.body);
            res.json(item);
        }
        else {
            res.status(404).json({ error: 'Item not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Delete an item by ID
itemsRoutes.delete('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = parseInt(req.params['id'], 10);
    try {
        const item = yield Items_1.default.findByPk(itemId);
        if (item) {
            yield item.destroy();
            res.json({ message: 'Item deleted successfully' });
        }
        else {
            res.status(404).json({ error: 'Item not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = itemsRoutes;
