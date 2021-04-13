const express = require('express');
const { readFile, writeFile } = require('fs').promises;
const data = require('../../crush.json');
const hasAuthorization = require('../middlewares/tokenAuthorization');

const router = express.Router();

const dataCrush = ('./crush.json');

const validateNameAndAge = (req, res, next) => {
  const { name, age } = req.body;
  const charRules = 3;
  const minAge = 18;
  const nameDontExist = 'O campo "name" é obrigatório';
  const invalidName = 'O "name" deve ter pelo menos 3 caracteres';
  const ageDontExist = 'O campo "age" é obrigatório';
  const invalidAge = 'O crush deve ser maior de idade';

  if (!name) return res.status(400).json({ message: nameDontExist });
  if (name.length < charRules) return res.status(400).json({ message: invalidName });
  if (!age) return res.status(400).json({ message: ageDontExist });
  if (age < minAge) return res.status(400).json({ message: invalidAge });

  next();
};

const dateSubFields = (date) => 
  (!date || date.datedAt === undefined || date.rate === undefined);
// source: referencia ao colega Vanderson Henrique - github

const dateValid = (date) => {
  const regex = /^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/g;
  return regex.test(date);
};

const validateDateAndRate = (req, res, next) => {
  const { date } = req.body; // feito assim por reclamar de complexidade

  const minRate = 1;
  const maxRate = 5;
  const invalidDate = 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
  const invalidRate = 'O campo "rate" deve ser um inteiro de 1 à 5';
  const dateDontExist = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';

  if (dateSubFields(date)) return res.status(400).json({ message: dateDontExist });
  if (!dateValid(date.datedAt)) return res.status(400).json({ message: invalidDate });
  if (!(date.rate >= minRate && date.rate <= maxRate)) {
    return res.status(400).json({ message: invalidRate });
  }

  next();
};

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
