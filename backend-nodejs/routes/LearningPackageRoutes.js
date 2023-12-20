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
const LearningPackage_1 = __importDefault(require("../Models/LearningPackage"));
const express_1 = __importDefault(require("express"));
const learningPackageRoutes = express_1.default.Router();
/// Methods for LearningPackage
// Define a route handler for GET /api/package
learningPackageRoutes.get('/api/package', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Utilisez "await" pour attendre que "LearningPackage.findAll()" se termine
        const packages = yield LearningPackage_1.default.findAll();
        // Retournez le tableau en tant que réponse JSON
        res.status(200).json(packages);
    }
    catch (error) {
        // En cas d'erreur, renvoyez une réponse d'erreur
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des packages.' });
    }
}));
// Define a route handler for GET /api/package/:id
learningPackageRoutes.get('/api/package/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idParam = parseInt(req.params.id, 10);
    try {
        // Utilisez Sequelize pour rechercher le package par ID dans la base de données
        const foundPackage = yield LearningPackage_1.default.findOne({
            where: { id: idParam, disabled: false },
        });
        if (foundPackage) {
            // Si le package avec l'ID donné est trouvé, renvoyez-le en tant que réponse JSON
            res.status(200).json(foundPackage);
        }
        else {
            // Si aucun package avec l'ID donné n'est trouvé, renvoyez une réponse 404 avec un message d'erreur
            res.status(404).json({ error: 'Package not found' });
        }
    }
    catch (error) {
        // En cas d'erreur, renvoyez une réponse d'erreur
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération du package.' });
    }
}));
// Define a route handler for GET /api/package-summaries
learningPackageRoutes.get('/api/package-summaries', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Utilisez Sequelize pour récupérer la liste des résumés de packages
        const packageSummaries = yield LearningPackage_1.default.findAll({
            attributes: ['id', 'title'], // Sélectionnez uniquement les champs {id, title}
        });
        if (packageSummaries.length > 0) {
            // Si des résumés de packages sont trouvés, renvoyez-les en tant que réponse JSON
            res.status(200).json(packageSummaries);
        }
        else {
            // Si aucun résumé de package n'est trouvé, renvoyez une réponse 404 avec un message d'erreur
            res.status(404).json({ error: 'Aucun résumé de package trouvé' });
        }
    }
    catch (error) {
        // En cas d'erreur, renvoyez une réponse d'erreur
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des résumés de package.' });
    }
}));
// Define a route handler for POST /api/package
learningPackageRoutes.post('/api/package', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, category, targetAudience, difficultyLevel } = req.body;
        // Vérifier si des champs obligatoires sont manquants
        if (!title || !description || !category) {
            return res.status(400).json({ error: 'Des champs obligatoires (title, description, category) sont manquants' });
        }
        // Utilisez Sequelize pour créer un nouveau package dans la base de données
        const newPackage = yield LearningPackage_1.default.create({
            title,
            description,
            category,
            targetAudience,
            difficultyLevel,
        });
        // Renvoyer le nouveau package créé en tant que réponse JSON avec le code d'état 201 (Created)
        res.status(201).json(newPackage);
    }
    catch (error) {
        // En cas d'erreur, renvoyez une réponse d'erreur
        console.error('Erreur lors de la création du package :', error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la création du package.' });
    }
}));
// Define a route handler for PUT /api/package/:id
learningPackageRoutes.put('/api/package/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParam = parseInt(req.params.id, 10);
        const updatedPackageData = req.body;
        // Vérifier si des champs obligatoires sont manquants
        if (!updatedPackageData.title || !updatedPackageData.description || !updatedPackageData.category) {
            return res.status(400).json({ error: 'Des champs obligatoires (title, description, category) sont manquants' });
        }
        // Recherchez l'enregistrement existant en fonction de l'ID
        const existingPackage = yield LearningPackage_1.default.findOne({
            where: { id: idParam, disabled: false },
        });
        if (!existingPackage) {
            // Si aucun package correspondant n'est trouvé, retournez une réponse 404
            return res.status(404).json({ error: 'Package not found' });
        }
        // Mettez à jour l'enregistrement existant avec les nouvelles données
        yield existingPackage.update(updatedPackageData);
        // Renvoyer l'enregistrement mis à jour en tant que réponse JSON avec le code d'état 200 (OK)
        res.status(200).json(existingPackage);
    }
    catch (error) {
        // En cas d'erreur, renvoyez une réponse d'erreur
        console.error('Erreur lors de la mise à jour du package :', error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour du package.' });
    }
}));
exports.default = learningPackageRoutes;
