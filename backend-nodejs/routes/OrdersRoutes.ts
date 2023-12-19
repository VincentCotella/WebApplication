import express, { Request, Response } from 'express';
import Orders from '../models/Orders';
import Users from '../models/Users';
import PaymentMethods from '../models/PaymentMethods';

const ordersRoutes = express.Router();

// Create a new order
ordersRoutes.post('/orders', async (req: Request, res: Response) => {
  try {
    const newOrder = await Orders.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all orders
ordersRoutes.get('/orders', async (req: Request, res: Response) => {
  try {
    const orders = await Orders.findAll();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific order by ID
ordersRoutes.get('/orders/:id', async (req: Request, res: Response) => {
  const orderId = parseInt(req.params['id'], 10);

  try {
    const order = await Orders.findByPk(orderId);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an order by ID
ordersRoutes.put('/orders/:id', async (req: Request, res: Response) => {
  const orderId = parseInt(req.params['id'], 10);

  try {
    const order = await Orders.findByPk(orderId);
    if (order) {
      await order.update(req.body);
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an order by ID
ordersRoutes.delete('/orders/:id', async (req: Request, res: Response) => {
  const orderId = parseInt(req.params['id'], 10);

  try {
    const order = await Orders.findByPk(orderId);
    if (order) {
      await order.destroy();
      res.json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default ordersRoutes;
