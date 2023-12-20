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
const LearningFact_1 = __importDefault(require("../Models/LearningFact"));
const LearningPackage_1 = __importDefault(require("../Models/LearningPackage"));
const express_1 = __importDefault(require("express"));
const learningFactRoutes = express_1.default.Router();
/// Methods for LearningFact:
// Define a route handler for GET /api/package/:id/fact
learningFactRoutes.get('/api/package/:id/fact', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idParam = parseInt(req.params.id, 10);
    try {
        // Utilisez Sequelize pour rechercher le package par ID dans la base de données
        const foundFact = yield LearningFact_1.default.findAll({
            where: { id_LearningPackage: idParam, disabled: false },
        });
        if (foundFact) {
            // Si le package avec l'ID donné est trouvé, renvoyez-le en tant que réponse JSON
            res.status(200).json(foundFact);
        }
        else {
            // Si aucun package avec l'ID donné n'est trouvé, renvoyez une réponse 404 avec un message d'erreur
            res.status(404).json({ error: 'Fact not found' });
        }
    }
    catch (error) {
        // En cas d'erreur, renvoyez une réponse d'erreur
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération du package.' });
    }
}));
// Define a route handler for POST /api/package/:id/fact
learningFactRoutes.post('/api/package/:id/fact', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idParam = parseInt(req.params.id, 10);
    try {
        // Use Sequelize to find the package by ID in the database
        const foundPackage = yield LearningPackage_1.default.findOne({
            where: { id: idParam, disabled: false },
        });
        if (!foundPackage) {
            // If no package with the given ID is found, return a 404 response with an error message
            return res.status(404).json({ error: 'Package not found' });
        }
        const { title, content } = req.body;
        // Check if mandatory fields are missing
        if (!title || !content) {
            return res.status(400).json({ error: 'Mandatory fields (title, content) are missing' });
        }
        // Use Sequelize to create a new fact in the database
        const newFact = yield LearningFact_1.default.create({
            title,
            content,
            id_LearningPackage: foundPackage.id, // Set the package ID for the fact
        });
        // Return the newly created fact as a JSON response with the status code 201 (Created)
        res.status(201).json(newFact);
    }
    catch (error) {
        // In case of an error, return an error response
        console.error('Error creating the fact:', error);
        res.status(500).json({ error: 'An error occurred while creating the fact.' });
    }
}));
// Define a route handler for POST /api/package/:id/fact
learningFactRoutes.put('/api/package/:packageId/fact/:factId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idParamPackage = parseInt(req.params.packageId, 10);
    const idParamFact = parseInt(req.params.factId, 10);
    try {
        // Use Sequelize to find the package by ID in the database
        const foundPackage = yield LearningPackage_1.default.findOne({
            where: { id: idParamPackage, disabled: false },
        });
        if (!foundPackage) {
            // If no package with the given ID is found, return a 404 response with an error message
            return res.status(404).json({ error: 'Package not found' });
        }
        const { title, content } = req.body;
        // Check if mandatory fields are missing
        if (!title || !content) {
            return res.status(400).json({ error: 'Mandatory fields (title, content) are missing' });
        }
        const foundFact = yield LearningFact_1.default.findOne({
            where: { id: idParamFact, disabled: false }
        });
        if (!foundFact) {
            // If no fact with the given ID is found, return a 404 response with an error message
            return res.status(404).json({ error: 'Fact not found' });
        }
        yield foundFact.update({
            title: title,
            content: content,
        });
        // Return the newly created fact as a JSON response with the status code 201 (Created)
        res.status(201).json(foundFact);
    }
    catch (error) {
        // In case of an error, return an error response
        console.error('Error editing the fact:', error);
        res.status(500).json({ error: 'An error occurred while creating the fact.' });
    }
}));
learningFactRoutes.delete('/api/package/:packageId/fact/:factId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idParamPackage = parseInt(req.params.packageId, 10);
    const idParamFact = parseInt(req.params.factId, 10);
    try {
        // Use Sequelize to find the package by ID in the database
        const foundPackage = yield LearningPackage_1.default.findOne({
            where: { id: idParamPackage, disabled: false },
        });
        if (!foundPackage) {
            // If no package with the given ID is found, return a 404 response with an error message
            return res.status(404).json({ error: 'Package not found' });
        }
        const foundFact = yield LearningFact_1.default.findOne({
            where: { id: idParamFact }
        });
        if (!foundFact) {
            // If no fact with the given ID is found, return a 404 response with an error message
            return res.status(404).json({ error: 'Fact not found' });
        }
        yield foundFact.update({
            disabled: false
        });
        // Return the newly created fact as a JSON response with the status code 201 (Created)
        res.status(201).json(foundFact);
    }
    catch (error) {
        // In case of an error, return an error response
        console.error('Error deleting the fact:', error);
        res.status(500).json({ error: 'An error occurred while deleting the fact.' });
    }
}));
exports.default = learningFactRoutes;
