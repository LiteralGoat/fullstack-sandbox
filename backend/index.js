const express = require('express');
const cors = require('cors');
const { readFile, writeFile } = require('fs');
const path = require('path');
const app = express();

app.use(cors());
express.json();

const PORT = 3001;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/get_todos', (req, res) => {
  readFile('./data.json', (err, todos) => {
    if (err) {
      throw Error(err);
    } else {
      res.json(JSON.parse(todos));
    }
  });
});

app.post('/api/save_todos', express.json(), (req, res) => {
  writeFile('data.json', JSON.stringify(req.body), (err) => {
    if (err) {
      throw Error(err);
    } else {
      res.send('Success!');
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () =>
  console.log(`We are up and running on port ${PORT}... d(-_^)`)
);
