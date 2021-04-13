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

module.exports = validateDateAndRate;
