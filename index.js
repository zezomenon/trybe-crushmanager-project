const express = require('express');
const bodyParser = require('body-parser');
const { crush, login, searchCrush } = require('./src/routes');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/crush/search', searchCrush);
app.use('/crush', crush);
app.use('/login', login);

app.listen(PORT, () => { console.log('Online'); });
