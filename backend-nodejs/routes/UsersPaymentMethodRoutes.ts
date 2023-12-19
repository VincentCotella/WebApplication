import express, { Request, Response } from 'express';
import UsersPaymentMethod from '../models/UsersPaymentMethod';
import Users from '../models/Users';
import PaymentMethods from '../models/PaymentMethods';

const usersPaymentMethodRoutes = express.Router();

// Create a new user payment method
usersPaymentMethodRoutes.post('/usersPaymentMethods', async (req: Request, res: Response) => {
  try {
    const newUserPaymentMethod = await UsersPaymentMethod.create(req.body);
    res.status(201).json(newUserPaymentMethod);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all user payment methods
usersPaymentMethodRoutes.get('/usersPaymentMethods', async (req: Request, res: Response) => {
  try {
    const userPaymentMethods = await UsersPaymentMethod.findAll();
    res.json(userPaymentMethods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get user payment methods for a specific user ID
usersPaymentMethodRoutes.get('/users/:userId/paymentMethods', async (req: Request, res: Response) => {
  const userId = parseInt(req.params['userId'], 10);

  try {
    const userPaymentMethods = await UsersPaymentMethod.findAll({
      where: { usersId: userId },
      include: [PaymentMethods],
    });

    res.json(userPaymentMethods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a user payment method by ID
usersPaymentMethodRoutes.put('/usersPaymentMethods/:id', async (req: Request, res: Response) => {
  const userPaymentMethodId = parseInt(req.params['id'], 10);

  try {
    const userPaymentMethod = await UsersPaymentMethod.findByPk(userPaymentMethodId);
    if (userPaymentMethod) {
      await userPaymentMethod.update(req.body);
      res.json(userPaymentMethod);
    } else {
      res.status(404).json({ error: 'User payment method not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a user payment method by ID
usersPaymentMethodRoutes.delete('/usersPaymentMethods/:id', async (req: Request, res: Response) => {
  const userPaymentMethodId = parseInt(req.params['id'], 10);

  try {
    const userPaymentMethod = await UsersPaymentMethod.findByPk(userPaymentMethodId);
    if (userPaymentMethod) {
      await userPaymentMethod.destroy();
      res.json({ message: 'User payment method deleted successfully' });
    } else {
      res.status(404).json({ error: 'User payment method not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default usersPaymentMethodRoutes;
