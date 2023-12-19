import express, { Request, Response } from 'express';
import Compatibility from '../models/Compatibility';
import Items from '../models/Items';

const compatiblityRoutes = express.Router();

// Create a new compatibility relationship
compatiblityRoutes.post('/compatibility', async (req: Request, res: Response) => {
  try {
    const newCompatibility = await Compatibility.create(req.body);
    res.status(201).json(newCompatibility);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all compatibility relationships
compatiblityRoutes.get('/compatibility', async (req: Request, res: Response) => {
  try {
    const compatibilityList = await Compatibility.findAll();
    res.json(compatibilityList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get compatibility relationships for a specific item ID
compatiblityRoutes.get('/items/:itemId/compatibility', async (req: Request, res: Response) => {
  const itemId = parseInt(req.params['itemId'], 10);

  try {
    const compatibilityList = await Compatibility.findAll({
      where: { itemId: itemId },
      include: [Items],
    });

    res.json(compatibilityList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a compatibility relationship by ID
compatiblityRoutes.put('/compatibility/:id', async (req: Request, res: Response) => {
  const compatibilityId = parseInt(req.params['id'], 10);

  try {
    const compatibility = await Compatibility.findByPk(compatibilityId);
    if (compatibility) {
      await compatibility.update(req.body);
      res.json(compatibility);
    } else {
      res.status(404).json({ error: 'Compatibility relationship not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a compatibility relationship by ID
compatiblityRoutes.delete('/compatibility/:id', async (req: Request, res: Response) => {
  const compatibilityId = parseInt(req.params['id'], 10);

  try {
    const compatibility = await Compatibility.findByPk(compatibilityId);
    if (compatibility) {
      await compatibility.destroy();
      res.json({ message: 'Compatibility relationship deleted successfully' });
    } else {
      res.status(404).json({ error: 'Compatibility relationship not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default compatiblityRoutes;
