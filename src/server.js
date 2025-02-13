// src/server.js
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;
