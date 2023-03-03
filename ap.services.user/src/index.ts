import { Application } from 'express';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const express = require('express');


const app: Application = express();
const PORT = process.env.PORT || 3000;
const userCtrl = require('./core/userController');

app.use(express.json());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', userCtrl);

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 http://localhost:${PORT}/doc`);
});
