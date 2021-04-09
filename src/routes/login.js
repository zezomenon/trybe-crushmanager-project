const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const randomToken = () => crypto.randomBytes(8).toString('hex');

const emailValidate = (email) => {
  const regex = /^[^@]+@\w+(\.\w+)+\w$/;
  return regex.test(String(email).toLowerCase);
};

const passwordValidate = (password) => {
  const regex = /^[0-9a-zA-Z]{6,}$/;
  return regex.test(password);
};

router.post('/', (req, res) => {
  const { email, password } = req.body;
  try {
    const token = randomToken();
    emailValidate(email);
    passwordValidate(password);
    // tratar erro 404, nao fiz ainda

    res.status(201).json({ token });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
