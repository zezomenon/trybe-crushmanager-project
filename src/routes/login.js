const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const randomToken = () => crypto.randomBytes(8).toString('hex');

const emailValid = (email) => {
  const regex = /^[^@]+@\w+(\.\w+)+\w$/;
  return regex.test(String(email).toLowerCase());
};

const passwordValid = (password) => {
    const regex = /^[0-9a-zA-Z]{6,}$/;
    return regex.test(password);
};

const validateEmailAndPassowrd = (req, res, next) => {
  const emailDontExist = 'O campo "email" é obrigatório';
  const emailInvalidFormat = 'O "email" deve ter o formato "email@email.com"';
  const passwordDontExist = 'O campo "password" é obrigatório';
  const passwordInvalidSize = 'A "senha" deve ter pelo menos 6 caracteres';

  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: emailDontExist });
  if (!emailValid(email)) return res.status(400).json({ message: emailInvalidFormat });
  if (!password) return res.status(400).json({ message: passwordDontExist });
  if (!passwordValid(password)) return res.status(400).json({ message: passwordInvalidSize });

  next();
};

router.post('/', validateEmailAndPassowrd, (_req, res) => {
  const token = randomToken();
  res.status(200).json({ token });
});

module.exports = router;
