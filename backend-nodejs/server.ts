import express, { Request, Response } from 'express';
//import { LearningPackage, UserLearningFact, UserPackageLearning, LearningFact } from './DataBase/models';
import compatiblityRoutes from './routes/CompatibilityRoutes';
import itemsRoutes from './routes/ItemsRoutes';
import ordersItemsRoutes from './routes/OrdersItemsRoutes';
import orderPCRoutes from './routes/OrdersPCRoutes';
import ordersRoutes from './routes/OrdersRoutes';
import paymentMethodRoutes from './routes/PaymentMethodRoutes'
import PCCompositionRoutes from './routes/PCCompositionRoutes';
import PCRoutes from './routes/PCRoutes';
import usersPaymentMethodRoutes from './routes/UsersPaymentMethodRoutes';
import usersRoutes from './routes/UsersRoutes';



// Create Express application
const app = express();

(async () => {
  try {
    // Start the server
    const port = 3000; // You can change this to the desired port number
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to conn<ect to the database:', error);
  }
})();


// Middleware to parse JSON request bodies
app.use(express.json());

// Use the imported route files as middleware
app.use(compatiblityRoutes);
app.use(itemsRoutes);
app.use(ordersItemsRoutes);
app.use(orderPCRoutes);
app.use(ordersRoutes);
app.use(PCCompositionRoutes);
app.use(PCRoutes);
app.use(usersPaymentMethodRoutes);
app.use(usersRoutes);
app.use(paymentMethodRoutes);

// Define route handlers
app.get('/api/liveness', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

app.get('/api/ok', (req: Request, res: Response) => {
  res.status(200).send('OK');
});
export default app;


