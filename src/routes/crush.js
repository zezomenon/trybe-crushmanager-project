const express = require('express');
const { readFile } = require('fs').promises;

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const response = JSON.parse(await readFile('./crush.json', 'utf-8'));
    res.status(200).json(response);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
