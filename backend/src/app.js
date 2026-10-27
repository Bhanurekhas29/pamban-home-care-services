require('dotenv').config();
require('express-async-errors');
const path = require('path');
const express = require('express');
const cors = require('cors');
const { UploadedFile } = require('./models');

const app = express();

app.use(cors());
app.use(express.json());
// photos saved before they moved to the database are still served from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.get('/uploads/:filename', async (req, res) => {
  const file = await UploadedFile.findByPk(req.params.filename);
  if (!file) return res.status(404).end();
  res.set({ 'Content-Type': file.mimeType, 'Cache-Control': 'public, max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff' });
  res.send(file.data);
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api', require('./routes/public'));
app.use('/api/admin', require('./routes/admin'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.name?.startsWith('Sequelize') ? 400 : 500).json({ message: err.message });
});

module.exports = app;
