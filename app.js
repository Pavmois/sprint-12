const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();
const users = require('./routes/users');
const cards = require('./routes/cards');
app.use(express.static(__dirname + '/public'));

app.get('/users', (req, res) => {
  res.send(users);
});

app.get('/users/:_id', (req, res) => {
  for (let i = 0; i < users.users.length; i++) {
    if (users.users[i]._id === req.params._id) {
      res.send(users.users[i])
      return;
    }
  } res.status(404).send({ "message": "Нет пользователя с таким id" });
});

app.get('/cards', (req, res) => {
  res.send(cards);
});

app.get('*', (req, res) => {
  res.status(404).send({ "message": "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => {
  console.log('Полёт нормальный');
});
