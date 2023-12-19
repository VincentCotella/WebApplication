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
const PC_1 = __importDefault(require("../models/PC"));
const PCRoutes = express_1.default.Router();
// Create a new PC
PCRoutes.post('/pcs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPC = yield PC_1.default.create(req.body);
        res.status(201).json(newPC);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Get all PCs
PCRoutes.get('/pcs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pcs = yield PC_1.default.findAll();
        res.json(pcs);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Get a specific PC by ID
PCRoutes.get('/pcs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pcId = parseInt(req.params['id'], 10);
    try {
        const pc = yield PC_1.default.findByPk(pcId);
        if (pc) {
            res.json(pc);
        }
        else {
            res.status(404).json({ error: 'PC not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Update a PC by ID
PCRoutes.put('/pcs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pcId = parseInt(req.params['id'], 10);
    try {
        const pc = yield PC_1.default.findByPk(pcId);
        if (pc) {
            yield pc.update(req.body);
            res.json(pc);
        }
        else {
            res.status(404).json({ error: 'PC not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Delete a PC by ID
PCRoutes.delete('/pcs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pcId = parseInt(req.params['id'], 10);
    try {
        const pc = yield PC_1.default.findByPk(pcId);
        if (pc) {
            yield pc.destroy();
            res.json({ message: 'PC deleted successfully' });
        }
        else {
            res.status(404).json({ error: 'PC not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = PCRoutes;
