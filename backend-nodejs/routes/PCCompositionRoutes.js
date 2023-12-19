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
const PCComposition_1 = __importDefault(require("../models/PCComposition"));
const Items_1 = __importDefault(require("../models/Items"));
const PCCompositionRoutes = express_1.default.Router();
// Create a new PC composition
PCCompositionRoutes.post('/pcCompositions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPCComposition = yield PCComposition_1.default.create(req.body);
        res.status(201).json(newPCComposition);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Get all PC compositions
PCCompositionRoutes.get('/pcCompositions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pcCompositions = yield PCComposition_1.default.findAll();
        res.json(pcCompositions);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Get PC compositions for a specific PC ID
PCCompositionRoutes.get('/pcs/:pcId/compositions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pcId = parseInt(req.params['pcId'], 10);
    try {
        const pcCompositions = yield PCComposition_1.default.findAll({
            where: { PCId: pcId },
            include: [Items_1.default],
        });
        res.json(pcCompositions);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Update a PC composition by ID
PCCompositionRoutes.put('/pcCompositions/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pcCompositionId = parseInt(req.params['id'], 10);
    try {
        const pcComposition = yield PCComposition_1.default.findByPk(pcCompositionId);
        if (pcComposition) {
            yield pcComposition.update(req.body);
            res.json(pcComposition);
        }
        else {
            res.status(404).json({ error: 'PC composition not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Delete a PC composition by ID
PCCompositionRoutes.delete('/pcCompositions/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pcCompositionId = parseInt(req.params['id'], 10);
    try {
        const pcComposition = yield PCComposition_1.default.findByPk(pcCompositionId);
        if (pcComposition) {
            yield pcComposition.destroy();
            res.json({ message: 'PC composition deleted successfully' });
        }
        else {
            res.status(404).json({ error: 'PC composition not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = PCCompositionRoutes;
