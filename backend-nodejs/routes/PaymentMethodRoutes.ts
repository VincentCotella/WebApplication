import express, { Request, Response } from 'express';
import PaymentMethods from '../models/PaymentMethods';

const paymentMethodRoutes = express.Router();

// Create a new payment method
paymentMethodRoutes.post('/paymentMethods', async (req: Request, res: Response) => {
  try {
    const newPaymentMethod = await PaymentMethods.create(req.body);
    res.status(201).json(newPaymentMethod);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all payment methods
paymentMethodRoutes.get('/paymentMethods', async (req: Request, res: Response) => {
  try {
    const paymentMethods = await PaymentMethods.findAll();
    res.json(paymentMethods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific payment method by ID
paymentMethodRoutes.get('/paymentMethods/:id', async (req: Request, res: Response) => {
  const paymentMethodId = parseInt(req.params['id'], 10);

  try {
    const paymentMethod = await PaymentMethods.findByPk(paymentMethodId);
    if (paymentMethod) {
      res.json(paymentMethod);
    } else {
      res.status(404).json({ error: 'Payment method not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a payment method by ID
paymentMethodRoutes.put('/paymentMethods/:id', async (req: Request, res: Response) => {
  const paymentMethodId = parseInt(req.params['id'], 10);

  try {
    const paymentMethod = await PaymentMethods.findByPk(paymentMethodId);
    if (paymentMethod) {
      await paymentMethod.update(req.body);
      res.json(paymentMethod);
    } else {
      res.status(404).json({ error: 'Payment method not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a payment method by ID
paymentMethodRoutes.delete('/paymentMethods/:id', async (req: Request, res: Response) => {
  const paymentMethodId = parseInt(req.params['id'], 10);

  try {
    const paymentMethod = await PaymentMethods.findByPk(paymentMethodId);
    if (paymentMethod) {
      await paymentMethod.destroy();
      res.json({ message: 'Payment method deleted successfully' });
    } else {
      res.status(404).json({ error: 'Payment method not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default paymentMethodRoutes;
