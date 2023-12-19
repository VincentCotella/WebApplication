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
//import { LearningPackage, UserLearningFact, UserPackageLearning, LearningFact } from './DataBase/models';
const CompatibilityRoutes_1 = __importDefault(require("./routes/CompatibilityRoutes"));
const ItemsRoutes_1 = __importDefault(require("./routes/ItemsRoutes"));
const OrdersItemsRoutes_1 = __importDefault(require("./routes/OrdersItemsRoutes"));
const OrdersPCRoutes_1 = __importDefault(require("./routes/OrdersPCRoutes"));
const OrdersRoutes_1 = __importDefault(require("./routes/OrdersRoutes"));
const PaymentMethodRoutes_1 = __importDefault(require("./routes/PaymentMethodRoutes"));
const PCCompositionRoutes_1 = __importDefault(require("./routes/PCCompositionRoutes"));
const PCRoutes_1 = __importDefault(require("./routes/PCRoutes"));
const UsersPaymentMethodRoutes_1 = __importDefault(require("./routes/UsersPaymentMethodRoutes"));
const UsersRoutes_1 = __importDefault(require("./routes/UsersRoutes"));
// Create Express application
const app = (0, express_1.default)();
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Start the server
        const port = 3000; // You can change this to the desired port number
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (error) {
        console.error('Unable to conn<ect to the database:', error);
    }
}))();
// Middleware to parse JSON request bodies
app.use(express_1.default.json());
// Use the imported route files as middleware
app.use(CompatibilityRoutes_1.default);
app.use(ItemsRoutes_1.default);
app.use(OrdersItemsRoutes_1.default);
app.use(OrdersPCRoutes_1.default);
app.use(OrdersRoutes_1.default);
app.use(PCCompositionRoutes_1.default);
app.use(PCRoutes_1.default);
app.use(UsersPaymentMethodRoutes_1.default);
app.use(UsersRoutes_1.default);
app.use(PaymentMethodRoutes_1.default);
// Define route handlers
app.get('/api/liveness', (req, res) => {
    res.status(200).send('OK');
});
app.get('/api/ok', (req, res) => {
    res.status(200).send('OK');
});
exports.default = app;
