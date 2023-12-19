import express, { Request, Response } from 'express';
import PCComposition from '../models/PCComposition';
import PC from '../models/PC';
import Items from '../models/Items';

const PCCompositionRoutes = express.Router();

// Create a new PC composition
PCCompositionRoutes.post('/pcCompositions', async (req: Request, res: Response) => {
  try {
    const newPCComposition = await PCComposition.create(req.body);
    res.status(201).json(newPCComposition);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all PC compositions
PCCompositionRoutes.get('/pcCompositions', async (req: Request, res: Response) => {
  try {
    const pcCompositions = await PCComposition.findAll();
    res.json(pcCompositions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get PC compositions for a specific PC ID
PCCompositionRoutes.get('/pcs/:pcId/compositions', async (req: Request, res: Response) => {
  const pcId = parseInt(req.params['pcId'], 10);

  try {
    const pcCompositions = await PCComposition.findAll({
      where: { PCId: pcId },
      include: [Items],
    });

    res.json(pcCompositions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a PC composition by ID
PCCompositionRoutes.put('/pcCompositions/:id', async (req: Request, res: Response) => {
  const pcCompositionId = parseInt(req.params['id'], 10);

  try {
    const pcComposition = await PCComposition.findByPk(pcCompositionId);
    if (pcComposition) {
      await pcComposition.update(req.body);
      res.json(pcComposition);
    } else {
      res.status(404).json({ error: 'PC composition not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a PC composition by ID
PCCompositionRoutes.delete('/pcCompositions/:id', async (req: Request, res: Response) => {
  const pcCompositionId = parseInt(req.params['id'], 10);

  try {
    const pcComposition = await PCComposition.findByPk(pcCompositionId);
    if (pcComposition) {
      await pcComposition.destroy();
      res.json({ message: 'PC composition deleted successfully' });
    } else {
      res.status(404).json({ error: 'PC composition not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default PCCompositionRoutes;
