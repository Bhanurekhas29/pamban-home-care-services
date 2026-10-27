require('dotenv').config();
require('express-async-errors');
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api', require('./routes/public'));
app.use('/api/admin', require('./routes/admin'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.name?.startsWith('Sequelize') ? 400 : 500).json({ message: err.message });
});

module.exports = app;
