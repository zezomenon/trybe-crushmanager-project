const express = require('express');
const { readFile, writeFile } = require('fs').promises;
const data = require('../../crush.json');
const {
  hasAuthorization,
  validateDateAndRate,
  validateNameAndAge,
} = require('../middlewares');

const router = express.Router();

const dataCrush = ('./crush.json'); // lint

router.get('/', async (_req, res) => {
  try {
    const response = JSON.parse(
      await readFile(dataCrush, 'utf-8'),
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
      await readFile(dataCrush, 'utf-8'),
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

router.post('/', hasAuthorization, validateNameAndAge, validateDateAndRate, async (req, res) => {
  const { name, age, date } = req.body;
  const data2 = JSON.parse(await readFile(dataCrush, 'utf-8'));
  const size = data2.length;
  const id = size + 1;
  const newData = {
    id,
    name,
    age,
    date,
  };
  const newD = [...data2, newData];
  try {
    const response = JSON.stringify(newD);
    await writeFile(`${__dirname}/../../crush.json`, response);
    res.status(201).json(newData);
  } catch (error) {
    throw new Error(error);
  }
});

router.put('/:id', hasAuthorization, validateNameAndAge, validateDateAndRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, date } = req.body;
  const filterDataToEdit = data.filter((element) => element.id !== Number(id));
  const editedData = {
    id: Number(id),
    name,
    age,
    date,
  };
  const newEditedData = [...filterDataToEdit, editedData];

  try {
    const response = JSON.stringify(newEditedData);
    await writeFile(`${__dirname}/../../crush.json`, response);
    res.status(200).json(editedData);
  } catch (error) {
    throw new Error(error);
  }
});

router.delete('/:id', hasAuthorization, async (req, res) => {
  const { id } = req.params;
  const filterItemToDelete = data.filter((element) => element.id !== Number(id));
  
  try {
    const response = JSON.stringify(filterItemToDelete);
    await writeFile(`${__dirname}/../../crush.json`, response);
    res.status(200).json({
      message: 'Crush deletado com sucesso',
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
