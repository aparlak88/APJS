import { Application } from 'express';

const express = require('express');

const app: Application = express();
const PORT = process.env.PORT || 8000;
const userCtrl = require('./core/userController');

app.use('/', userCtrl);

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});
