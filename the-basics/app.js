const express = require('express');

const app = express();

// app.use((req, res, next) => {
//   console.log('First Middleware!');
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Second Middleware!');
//   res.send('<p>Task 2</p>');
// });

app.use('/users', (req, res, next) => {
  console.log('/users middleware');
  res.send('<h1>The Middleware that handles /users</h1>');
});

app.use('/', (req, res, next) => {
  console.log('/middleware');
  res.send('<p>The Middleware that handles just /</p>');
});

app.listen(3000);
