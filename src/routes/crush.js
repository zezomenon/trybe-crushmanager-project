const express = require('express');
const { readFile } = require('fs').promises;
// const data = require('../../crush.json');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const response = JSON.parse(
      await readFile('./crush.json', 'utf-8'),
    );
    res.status(200).json(response);
  } catch (error) {
    throw new Error(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = JSON.parse(
      await readFile('./crush.json', 'utf-8'),
    );
    const crushById = response.find(
      (crush) => crush.id === Number(id),
    );
    if (!crushById) {
      return res.status(404).json({
        message: 'Crush não encontrado',
      });
    }
    return res.status(200).json(crushById);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
