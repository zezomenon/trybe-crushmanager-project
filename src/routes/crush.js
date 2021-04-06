const express = require('express');
const fs = require('fs').promises;
const data = require('../../crush.json');

const route = express();

route.get('/', async (_req, res) => {
  try {
    const response = await JSON.parse(fs.readFile(data));
    return res.status(200).json(response);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = route;
