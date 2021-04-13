const express = require('express');
const { readFile } = require('fs').promises;
const { hasAuthorization } = require('../middlewares');

const router = express.Router();

router.get('/', hasAuthorization, async (req, res) => {
  const { q } = req.query;

  const data = JSON.parse(await readFile('./crush.json', 'utf-8'));
  let filteredData = [...data];

  try {
    if (q) {
      filteredData = filteredData.filter((element) => element.name.includes(q));
    }
    
    res.status(200).json(filteredData);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
