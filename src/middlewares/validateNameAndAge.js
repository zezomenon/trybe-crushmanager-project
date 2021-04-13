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

module.exports = validateNameAndAge;
