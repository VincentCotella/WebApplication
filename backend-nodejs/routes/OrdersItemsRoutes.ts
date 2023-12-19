import express, { Request, Response } from 'express';
import OrdersItems from '../models/OrdersItems';
import Orders from '../models/Orders';
import Items from '../models/Items';

const ordersItemsRoutes = express.Router();

// Create a new order item
ordersItemsRoutes.post('/ordersItems', async (req: Request, res: Response) => {
  try {
    const newOrderItem = await OrdersItems.create(req.body);
    res.status(201).json(newOrderItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all order items
ordersItemsRoutes.get('/ordersItems', async (req: Request, res: Response) => {
  try {
    const orderItems = await OrdersItems.findAll();
    res.json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get order items for a specific order ID
ordersItemsRoutes.get('/orders/:orderId/items', async (req: Request, res: Response) => {
  const orderId = parseInt(req.params['orderId'], 10);

  try {
    const orderItems = await OrdersItems.findAll({
      where: { ordersId: orderId },
      include: [Items],
    });

    res.json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an order item by ID
ordersItemsRoutes.put('/ordersItems/:id', async (req: Request, res: Response) => {
  const orderItemId = parseInt(req.params['id'], 10);

  try {
    const orderItem = await OrdersItems.findByPk(orderItemId);
    if (orderItem) {
      await orderItem.update(req.body);
      res.json(orderItem);
    } else {
      res.status(404).json({ error: 'Order item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an order item by ID
ordersItemsRoutes.delete('/ordersItems/:id', async (req: Request, res: Response) => {
  const orderItemId = parseInt(req.params['id'], 10);

  try {
    const orderItem = await OrdersItems.findByPk(orderItemId);
    if (orderItem) {
      await orderItem.destroy();
      res.json({ message: 'Order item deleted successfully' });
    } else {
      res.status(404).json({ error: 'Order item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default ordersItemsRoutes;
