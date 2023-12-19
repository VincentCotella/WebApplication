import express, { Request, Response } from 'express';
import Items from '../models/Items';

const itemsRoutes = express.Router();

// Create a new item
itemsRoutes.post('/items', async (req: Request, res: Response) => {
  try {
    const newItem = await Items.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all items
itemsRoutes.get('/items', async (req: Request, res: Response) => {
  try {
    const items = await Items.findAll();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific item by ID
itemsRoutes.get('/items/:id', async (req: Request, res: Response) => {
  const itemId = parseInt(req.params['id'], 10);

  try {
    const item = await Items.findByPk(itemId);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an item by ID
itemsRoutes.put('/items/:id', async (req: Request, res: Response) => {
  const itemId = parseInt(req.params['id'], 10);

  try {
    const item = await Items.findByPk(itemId);
    if (item) {
      await item.update(req.body);
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an item by ID
itemsRoutes.delete('/items/:id', async (req: Request, res: Response) => {
  const itemId = parseInt(req.params['id'], 10);

  try {
    const item = await Items.findByPk(itemId);
    if (item) {
      await item.destroy();
      res.json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default itemsRoutes;
