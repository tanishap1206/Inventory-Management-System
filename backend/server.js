require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./config/db');
const inventoryRoutes = require('./routes/inventoryRoutes');
const assetRoutes = require('./routes/assetRoutes');
const { errorHandler } = require('./utils/errorHandler');

const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

db.connect();

app.use('/api/inventory', inventoryRoutes);
app.use('/api/assets', assetRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date() }));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use('/api/requests', require('./routes/requestRoutes'));
