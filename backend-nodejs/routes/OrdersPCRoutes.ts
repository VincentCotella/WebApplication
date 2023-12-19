import express, { Request, Response } from 'express';
import OrdersPC from '../models/OrdersPC';
import Orders from '../models/Orders';
import PC from '../models/PC';

const orderPCRoutes = express.Router();

// Create a new order PC
orderPCRoutes.post('/ordersPCs', async (req: Request, res: Response) => {
  try {
    const newOrderPC = await OrdersPC.create(req.body);
    res.status(201).json(newOrderPC);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all order PCs
orderPCRoutes.get('/ordersPCs', async (req: Request, res: Response) => {
  try {
    const orderPCs = await OrdersPC.findAll();
    res.json(orderPCs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get order PCs for a specific order ID
orderPCRoutes.get('/orders/:orderId/pcs', async (req: Request, res: Response) => {
  const orderId = parseInt(req.params['orderId'], 10);

  try {
    const orderPCs = await OrdersPC.findAll({
      where: { ordersId: orderId },
      include: [PC],
    });

    res.json(orderPCs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an order PC by ID
orderPCRoutes.put('/ordersPCs/:id', async (req: Request, res: Response) => {
  const orderPCId = parseInt(req.params['id'], 10);

  try {
    const orderPC = await OrdersPC.findByPk(orderPCId);
    if (orderPC) {
      await orderPC.update(req.body);
      res.json(orderPC);
    } else {
      res.status(404).json({ error: 'Order PC not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an order PC by ID
orderPCRoutes.delete('/ordersPCs/:id', async (req: Request, res: Response) => {
  const orderPCId = parseInt(req.params['id'], 10);

  try {
    const orderPC = await OrdersPC.findByPk(orderPCId);
    if (orderPC) {
      await orderPC.destroy();
      res.json({ message: 'Order PC deleted successfully' });
    } else {
      res.status(404).json({ error: 'Order PC not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default orderPCRoutes;
