/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';

const app = express();
app.use(express.json());

const items = [
  { id: 101, description: 'Beer glass' },
  { id: 102, description: 'Small Pizza' },
  { id: 103, description: 'Big Pizza' },
  { id: 104, description: 'Fries' },
];

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.get('/api/menu', (req, res) => {
  res.send(items);
});

app.post('/api/menu', (req, res) => {
  items.push(req.body);
  res.send(req.body);
})

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
