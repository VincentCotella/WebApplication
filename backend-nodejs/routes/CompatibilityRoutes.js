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
const Compatibility_1 = __importDefault(require("../models/Compatibility"));
const Items_1 = __importDefault(require("../models/Items"));
const compatiblityRoutes = express_1.default.Router();
// Create a new compatibility relationship
compatiblityRoutes.post('/compatibility', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCompatibility = yield Compatibility_1.default.create(req.body);
        res.status(201).json(newCompatibility);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Get all compatibility relationships
compatiblityRoutes.get('/compatibility', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const compatibilityList = yield Compatibility_1.default.findAll();
        res.json(compatibilityList);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Get compatibility relationships for a specific item ID
compatiblityRoutes.get('/items/:itemId/compatibility', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = parseInt(req.params['itemId'], 10);
    try {
        const compatibilityList = yield Compatibility_1.default.findAll({
            where: { itemId: itemId },
            include: [Items_1.default],
        });
        res.json(compatibilityList);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Update a compatibility relationship by ID
compatiblityRoutes.put('/compatibility/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const compatibilityId = parseInt(req.params['id'], 10);
    try {
        const compatibility = yield Compatibility_1.default.findByPk(compatibilityId);
        if (compatibility) {
            yield compatibility.update(req.body);
            res.json(compatibility);
        }
        else {
            res.status(404).json({ error: 'Compatibility relationship not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Delete a compatibility relationship by ID
compatiblityRoutes.delete('/compatibility/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const compatibilityId = parseInt(req.params['id'], 10);
    try {
        const compatibility = yield Compatibility_1.default.findByPk(compatibilityId);
        if (compatibility) {
            yield compatibility.destroy();
            res.json({ message: 'Compatibility relationship deleted successfully' });
        }
        else {
            res.status(404).json({ error: 'Compatibility relationship not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = compatiblityRoutes;
