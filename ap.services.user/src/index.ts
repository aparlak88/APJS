import { Application } from 'express';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { Sequelizer } from './data/sequelizer';

const swaggerDocument = require('../swagger.json');
const app: Application = express();
const PORT = process.env.PORT || 3000;
const userCtrl = require('./core/userController');

const sequelizer = new Sequelizer();
sequelizer.syncTables();

app.use(express.json());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', userCtrl);

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 http://localhost:${PORT}/doc`);
});
